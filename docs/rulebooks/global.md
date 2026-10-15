# Global Rules

Applies to every file in this repository: the web app in `app/` and the Supabase code in `supabase/`.

## File naming

All files use **kebab-case**. No exceptions.

```
report-card.tsx         use-sync.ts
connections.service.ts  github-oauth.ts
auth.schema.ts          20261015000000_v2_schema.sql
```

Not `ReportCard.tsx`, `useSync.ts`, `connectionsService.ts`.

Linux is case-sensitive; mixed naming breaks imports in CI and on the static host. Route files follow React Router's `$param` and `.` conventions on top of this — see [frontend.md](frontend.md).

## No comments

Explanatory comments and JSDoc blocks are not written here. Only these are allowed:

| Allowed | Example |
|---|---|
| Actionable markers | `// TODO:`, `// FIXME:`, `// HACK:` |
| Tooling directives | `// eslint-disable-next-line`, `// @ts-expect-error`, `// deno-lint-ignore` |

Code carries meaning through names, types, and structure. If prose is needed to follow it, rename the thing or split it. This applies to SQL migrations too.

Knowledge that cannot live in code goes in the commit message (why a change happened) or `CLAUDE.md` (a non-obvious constraint).

## Imports

**Import the names you use, never the whole module.** `import { useState, type ReactNode } from 'react'`, not `import * as React from 'react'` or `import React from 'react'`. The same goes for every library.

The import line is the cheapest summary of what a file depends on. A namespace import hides it, makes every use a prefix that says nothing, and pulls the whole module in to reach two members.

**Types too.** Do not reach for the global `React.` namespace (`React.ReactNode`, `React.FormEvent`) — import the type by name.

One exception: `z` from `zod`. `z` is zod's whole API — a schema file uses a dozen of its members plus `z.infer`.

ESLint enforces this (`no-restricted-syntax` on namespace imports).

## Say it in less code

**Ten lines that read clearly beat fifty that spell out the same thing.** Before writing a block, ask whether the language already does it.

Map/filter/reduce over a hand-rolled loop that pushes into an array, destructuring over a run of property reads, a lookup object over a chain of `if`s or a `switch` comparing one value, spread over field-by-field copying.

This is about mechanical repetition, not compression for its own sake. Never collapse distinct logic into a dense one-liner to save space — if the short version hides a branch that matters, keep it explicit. Fewer lines is the result of removing repetition, never the goal itself.

## Types are checked

**`yarn ts:check` must pass. `yarn build` runs it, so a type error fails the build.** For edge functions, `yarn functions:check` (Deno) must pass.

`react-router build` strips types without checking them, so a green build alone proves nothing.

Fix the source rather than each call site. A cluster of `possibly undefined` errors is usually one badly typed value seen from many places.

Do not silence an error with `@ts-ignore`, `any` or a non-null `!`, and do not loosen a compiler flag to make one go away. `noUncheckedIndexedAccess` is on.

**Database types are generated.** `yarn db:types` writes `app/types/database.ts` and `supabase/functions/_shared/database.types.ts` from the local database. Regenerate after every migration and never hand-edit either file.

## Structure

- One file = one responsibility
- Never mix UI, logic, types, and constants in one file

A file named for a handler, component, or service contains *that thing only*. Constants, generic helpers and types declared at the top of it are a second responsibility that has moved in — they belong in a shared location from the moment they are written, not once a second caller appears.

| What it is | Web app | Edge functions |
|---|---|---|
| Generic helper, no domain knowledge | `app/lib/` | `supabase/functions/_shared/lib/` |
| Domain constant — limits, option sets, copy tables | `app/data/<feature>/` | `supabase/functions/_shared/constants/` |
| Enum | a Postgres enum, read from the generated types | same |
| Shared type | `app/types/` | `supabase/functions/_shared/types/` |

Details are in [frontend.md](frontend.md) and [backend.md](backend.md); the principle is identical.

**A barrel file only re-exports.** An `index.ts` that also declares a constant is mixing responsibilities.

Do not wait for duplication to justify the move. A limit sitting in a handler is already in the wrong file, even with one caller.
