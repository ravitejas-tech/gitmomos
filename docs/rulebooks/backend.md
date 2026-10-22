# Backend Rules

Supabase: Postgres migrations, Row Level Security, Vault, pg_cron, and Deno edge functions. Applies to `supabase/`.

## Layout

```
supabase/
  migrations/                 one file per schema change
  functions/
    connections/index.ts      entry point: auth, parse, dispatch
    sync/index.ts             entry point: auth, parse, dispatch
    profile-chat/index.ts     entry point: anonymous, parse, answer
    _shared/
      http/                   serve, HttpError, json, cors
      supabase/               admin client, requireUser, unwrap
      schemas/                Zod request bodies, <feature>.schema.ts
      connections/            one handler per operation
      sync/                   collect commits, write a day's report
      reports/                report prompt and generation
      profile-chat/           embed reports, match a question, answer it
      gemini/                 generateContent and batchEmbedContents over REST
      providers/              GitHub and Gitea clients
      constants/              <topic>.constants.ts
      types/                  <topic>.types.ts
      lib/                    dates, env, map-limit, safe-equal
      database.types.ts       generated — never edit
```

## Entry points hold no logic

An edge function's `index.ts` is the controller: it authenticates, parses the body with a Zod schema, and hands off to a handler. No queries, no provider calls, no data shaping.

```ts
serve(async (req) => {
    const user = await requireUser(req)
    const body = parseBody(connectionsRequestSchema, await req.json())
    return json(await ACTIONS[body.action](user.id, body))
})
```

A multi-operation function dispatches through a lookup object keyed by the request's `action`, never a `switch`.

**Handlers are one exported function per file** in `_shared/<feature>/`, named for the operation (`start-github.ts` exports `startGitHub`). When a handler has several steps, split them into functions in the same file so the exported one reads as orchestration. Never a 100-line handler.

## One operation, one endpoint

**A new action is justified by a new operation, not by a new caller or a new screen.** Before adding an action or a function, find the one that already performs the write and extend it. A separate action earns its place when the operation differs in authorization, side effects, or lifecycle — not when it differs only in which fields the UI sends.

**Derive state, do not add an action to set it.**

## Request bodies

Every body is parsed with a Zod schema from `_shared/schemas/<feature>.schema.ts` through `parseBody`, which throws a 400 `HttpError` on failure. Never read `body.something` off an unparsed `any`.

## Database access from functions

The service-role client (`adminClient()`) **bypasses RLS**. Every query it runs scopes by `user_id` explicitly, or by an id already proven to belong to the user.

Results go through `unwrap`, which returns `data` or throws an `HttpError` — never an ignored `{ error }`.

## Multiple writes are one SQL function

**Whenever an operation writes more than once, the writes live in one Postgres function called with `rpc`.** supabase-js has no transactions; two sequential `.insert()`s from a function are a defect, because a failure on the second leaves inconsistent data. A function body runs in one transaction.

`save_connection` (connection row + Vault token) and `record_repository_commits` (commits + `last_synced_at`) are the reference.

Such functions are `security definer`, `set search_path = ''`, and executable only by `service_role` (`revoke all ... from public, anon, authenticated`).

## Migrations

```bash
yarn supabase migration new <snake_case_name>   # write the change
yarn db:reset                                    # apply everything to the local database
yarn db:types                                    # regenerate the TypeScript types
```

**Every schema change is a new migration.** `20261015000000_v2_schema.sql` is the baseline; once it has run on a hosted project it is frozen — never edit, regenerate or delete it, and never reset a hosted database to apply a change. Production data must survive.

**Verify no drift:** after `yarn db:reset`, `yarn db:diff` must output nothing. A change made in the Studio and not captured in a migration is drift and gets fixed, not shipped.

Regenerate the types in the same change as the migration. They are committed together.

## Tables

- Primary key `id uuid default gen_random_uuid()`. Not serial, not text.
- User-owned tables carry `user_id uuid not null references public.profiles (id) on delete cascade`.
- Columns are `snake_case`, Postgres's convention; supabase-js returns them unchanged.
- `created_at timestamptz not null default now()`; tables that change carry `updated_at` maintained by the `set_updated_at` trigger.
- FK columns are declared explicitly beside the columns they reference, never implied.

### Instants and days

**An instant is `timestamptz`, never `timestamp`.** A plain `timestamp` stores a wall clock with no zone and misreads across processes. A calendar day (a report's `date`) is `date`.

### Enums

**An option set is a Postgres enum** (`create type public.provider_name as enum (...)`), declared once in a migration. The generated types expose it to both the web app and the functions as `Enums<'provider_name'>`. Never a `text` column with a `check (x in (...))`, and never a string union retyped in TypeScript.

### Indexes

**Default to no index.** Add one only where a query that actually exists needs it, or where the domain requires uniqueness. Every index costs write throughput, and a speculative one never gets removed.

## Row Level Security

- **RLS is enabled on every table**, including service-only ones (which simply have no policies).
- Policies are `to authenticated` and compare `(select auth.uid())` with the owning column — the subselect lets Postgres evaluate it once per query.
- **The browser's write access is column-scoped.** Revoke `insert, update` from `anon, authenticated`, then `grant update (col, ...)` for exactly what the UI may change. Everything else is written by a function with the service role.

## Secrets

**A provider token is never a table column.** It lives in Supabase Vault, written and read only through `set_connection_token` / `get_connection_token` (service role only). Deleting a connection deletes its secret through a trigger.

Edge function secrets (`GEMINI_API_KEY`, `GITHUB_CLIENT_*`, `WORKER_SECRET`) are read through `requireEnv`, which fails loudly when one is missing.

## Errors

**Throw `HttpError(status, message)`, never `new Error()`.** `serve` turns an `HttpError` into a JSON `{ error }` response with its status and anything else into a 500. `ProviderAuthError` (an `HttpError`) means the forge rejected the stored token; callers mark the connection `error`.

Messages are written for the user who will read them in a toast.

## Logging

`console.error` once, in `serve`, for unexpected errors. Never `console.log`.

## Time zone

**Every user has their own timezone** (`profiles.timezone`, validated against `pg_timezone_names`). A report covers one local calendar day in that zone.

| Need | Use | Not |
|---|---|---|
| A user's today | `localDate(timeZone)` | `new Date().toISOString().slice(0, 10)` |
| The instants a local day spans | `dayWindow(date, timeZone)` | `` new Date(`${date}T00:00:00Z`) `` |
| Day arithmetic on `YYYY-MM-DD` | `addDays(date, n)` | `setDate` on a local `Date` |
| The hour in SQL | `now() at time zone p.timezone` | `extract(hour from now())` |

## Background work

`pg_cron` runs `enqueue_daily_syncs()` hourly at :05. It posts, through `pg_net`, one request per user whose local clock has just passed midnight to the `sync` function, authenticated with the `x-worker-secret` header.

- `sync` is idempotent: commits upsert on `(repository_id, sha)` and the report upserts on `(user_id, date)`, so a rerun is always safe.
- **An edited report is never regenerated.** `edited_at` set means the worker leaves it alone.
- **The report prompt writes for non-engineers** (`_shared/reports/build-prompt.ts`): outcomes in plain language, no jargon, nothing the commits don't show. `RESPONSE_SCHEMA`, `ReportContent`, and `reportContentSchema` in both the app and `_shared/schemas/report.schema.ts` change together.
- **`commits.kind` is generated** from the message by `commit_kind()` (conventional prefix first, then keywords). Change the classification in a new migration that replaces the function; the stored column recomputes only for rows that are rewritten, so a backfill is an `update commits set message = message`.
- Long work fans out from Postgres (one `pg_net` call per user), never as a loop inside one function invocation.

## External APIs

- Provider clients live in `_shared/providers/` and only call read endpoints.
- Every paginated loop has a cap from `constants/`.
- **A user-supplied URL is validated before the server fetches it** (`gitea-url.ts`): https only, no private or local hosts, unless `ALLOW_LOCAL_GITEA` is set for development.
