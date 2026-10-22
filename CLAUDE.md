# gitmomos

Daily work reports written from a developer's git commits. A user signs up on the website, connects GitHub (OAuth) or Gitea (access token), adds repositories by URL, and a nightly worker collects the commits they authored and writes one report per day with Gemini. An optional public profile (`/@handle`) shows their highlights and a chatbot that answers visitors from their reports.

There is no CLI and no server of our own: a static React Router SPA talks to Supabase, and three edge functions do the work that needs secrets.

## Rulebooks

Read the one that covers what you are touching. Do not read them all.

| Editing | Read |
|---|---|
| Anything | [global.md](docs/rulebooks/global.md) — naming, no-comments, imports, file structure |
| `app/` | [frontend.md](docs/rulebooks/frontend.md) |
| `supabase/` | [backend.md](docs/rulebooks/backend.md) |
| Committing, branching or releasing | [git.md](docs/rulebooks/git.md) |

`global.md` is short and always applies. The others are read on demand.

## The rules that bite most often

- **`yarn ts:check` must pass** — it runs in `yarn build`. `yarn functions:check` must pass for edge functions. Fix the type, don't silence it.
- **kebab-case filenames**, everywhere, no exceptions.
- **No explanatory comments or JSDoc**, in TypeScript or SQL. Only `TODO`/`FIXME`/`HACK` and tooling directives.
- **Never commit without explicit per-batch approval.** Prior approval never carries forward.
- **One file per commit.** No `Co-Authored-By` or any AI attribution.
- **Every piece of text renders through `Text`**, and matching class strings are one component.
- **`mutate`, never `mutateAsync`;** outcomes and toasts live in the hook.
- **Theme tokens only** — no stock Tailwind palette class, no hex, no gradients or glows.
- **Multiple DB writes are one SQL function** called with `rpc`, never sequential supabase-js calls.
- **Every schema change is a new migration**, followed by `yarn db:types`.

## Stack

| Layer | Choice |
|---|---|
| Package manager | Yarn 4 (`node-modules` linker, `yarnPath` in `.yarn/releases`) |
| Web | React 19 + React Router 7 (SPA, `ssr: false`) + Tailwind 4 + TanStack Query (`react-query-kit`) |
| Forms | `react-hook-form` + Zod |
| Charts | Recharts, coloured from theme tokens |
| Toasts | `react-hot-toast` |
| Database | Supabase Postgres + RLS, Vault, `pg_cron`, `pg_net` |
| Functions | Supabase Edge Functions (Deno 2) |
| AI | Gemini over REST: `GEMINI_MODEL` (default `gemini-flash-latest`) for reports, `GEMINI_CHAT_MODEL` (default `gemini-flash-lite-latest`) for the chatbot, `gemini-embedding-2` for search |

## Layout

```
app/
  root.tsx, routes.ts, global.css
  routes/        URL-mirroring route modules
  components/    ui/ primitives + one folder per feature
  hooks/ data/ lib/ schemas/ services/ types/
supabase/
  migrations/    schema, RLS, Vault helpers, cron
  functions/     connections/, sync/, profile-chat/, _shared/
docs/
  self-hosting.md  deployment guide, kept in step with the setup it describes
  rulebooks/       the rules
  images/          README screenshots and logo
```

## Commands

```bash
yarn dev                  # http://localhost:5173
yarn build                # ts:check, then build/client (static)
yarn ts:check             # typegen + tsc
yarn lint
yarn format

yarn db:start             # local Supabase in Docker, applies migrations
yarn db:reset             # re-apply every migration locally
yarn db:diff              # must print nothing after db:reset
yarn db:types             # regenerate both database type files
yarn functions:serve      # edge functions with supabase/functions/.env
yarn functions:check      # deno check + deno lint
yarn functions:deploy
yarn secrets:set          # upload supabase/functions/.env
```

## Environment

| File | Holds |
|---|---|
| `.env` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_PROJECT_ID` |
| `supabase/functions/.env` | `GEMINI_API_KEY`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `WORKER_SECRET`, optional `GEMINI_MODEL`, `GEMINI_CHAT_MODEL`, `ALLOW_LOCAL_GITEA` |

Both are gitignored; the `.example` files beside them list every key.

## Gotchas

- **The nightly worker needs two Vault secrets** that no migration can create: `project_url` (`https://<ref>.supabase.co`, or `http://supabase_kong_gitmomos:8000` locally) and `worker_secret` (equal to the `WORKER_SECRET` function secret). Without them `enqueue_daily_syncs()` logs a warning and does nothing.
- **A report covers a local calendar day.** The worker runs hourly and picks users whose `profiles.timezone` has just passed midnight; it syncs the day that ended. Half-hour and 45-minute offset zones still match exactly once a day.
- **An edited report is never regenerated** — `edited_at` set means the worker and "Sync now" leave its content alone.
- **GitHub commits are matched by login** (`author=<login>`); commits made with an email not linked to the GitHub account are missed. Gitea commits match the login or any of the account's emails.
- **Commits are windowed by committer date**, because that is what GitHub's `since`/`until` filter on. A rebase moves a commit into the day it was rebased.
- **GitHub allows one OAuth callback URL per app.** Local development needs its own OAuth App pointing at `http://localhost:5173/dashboard/connections/github`.
- **OAuth Apps can only read private repositories with the `repo` scope.** The functions only call read endpoints.
- **`verify_jwt` is off for every function** (`supabase/config.toml`); `connections` and `sync` authenticate with the user's JWT or the worker secret, and `profile-chat` is anonymous, rate-limited per visitor and per profile by `claim_profile_question()`.
- **A report is public only when every repository in it has `on_profile` on** (`is_profile_report()`). Repository names never leave the server; visitors see the headline, summary, highlights and work areas.
- **Report embeddings are written lazily** by `profile-chat` before it answers, up to `MAX_INDEX_BATCHES` × `EMBEDDING_BATCH_SIZE` per question. Editing a report's content deletes its embedding (`reports_forget_embedding`), so it is re-embedded on the next question. `EMBEDDING_DIMENSIONS` must match `vector(768)` in the migration.
- **The chatbot uses Flash-Lite** because `gemini-flash-latest` took 40–90 s per call on the free tier when it was built: fine overnight, not in a chat.
- **Unknown paths must fall back to `/__spa-fallback.html`** on the static host. `/`, `/roadmap`, `/legal/*`, `/robots.txt` and `/sitemap.xml` are prerendered at build time, so nothing they import may touch browser globals at module scope.
- **`/:handle` matches every top-level path** that no static route claims. Its `clientLoader` throws a 404 unless the segment is `@` plus a valid handle, which keeps unknown URLs on the normal 404 page.
- **Canonical links, Open Graph tags, `robots.txt` and `sitemap.xml` use `SITE_URL`** (`app/data/seo/site.ts`). Change it when the production domain changes; a public page added to the site goes in `SITEMAP_PATHS`.
- **`yarn build` needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`** (from `.env` or the CI environment): prerendering imports `services/supabase.ts`, and `createClient` throws on an empty URL.
- **`@react-router/node` and `isbot` are runtime dependencies** even though nothing runs on a server: React Router only finds them in `dependencies` and needs them to prerender.
- **ESLint stays on 9** until `eslint-plugin-react` supports 10.
- **Light and dark come from one token set** in `app/global.css`, switched by `data-theme` on `<html>` (set before paint by `THEME_INIT_SCRIPT`). Never use the `dark:` variant; check UI in both themes.
- **An unknown Tailwind colour class fails silently** and borders fall back to `currentColor` — grep for old token names after renaming one.
- **Upgrading a v1 database** means `supabase db reset --linked`, which deletes all v1 data. v2 does not migrate it.
