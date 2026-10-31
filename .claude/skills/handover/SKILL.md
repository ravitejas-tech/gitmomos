---
name: handover
description: Final checks before handing a finished change over — build with the type check, lint, edge function checks, migration drift, both themes and the rulebook review — then the steps to test it by hand. Use when a change is done and about to be handed over, or when someone asks whether it is ready.
---

Hand over only what passed these checks, and say plainly what you could not check.

1. **Type check and build.** `yarn build` runs `yarn ts:check`, then prerenders `/`, `/roadmap`, `/legal/*`, `/robots.txt` and `/sitemap.xml`. Fix the source of an error, never silence it.
2. **Lint.** `yarn lint`.
3. **Edge functions**, if `supabase/functions/` changed: `yarn functions:check`. A green check doesn't prove a function runs: if the developer's `yarn functions:serve` is running, call the changed action against it. Never start, restart or stop their servers; if none is running, list this check as not done.
4. **Migrations**, if `supabase/migrations/` changed: `yarn db:reset`, then `yarn db:diff` must print nothing, and `yarn db:types` must leave both generated type files unchanged. These need the local Supabase in Docker; if it isn't running, list the check as not done. Never reset, push to or dump the linked project.
5. **UI**, if a component or page changed: look at it in the light and dark themes and at phone width.
6. **Rules.** Run the `rulebook-reviewer` agent and fix what it reports.

Then write the handover:

- What changed, in a few lines.
- **Steps to test by hand**, numbered and click by click: signed in and signed out, and as a visitor on a public profile, where that matters. If the work came from an issue, walk what it asks for one point at a time.
- What wasn't verified, and why.

Don't commit. Committing needs the developer's approval for that batch (`/commit`).
