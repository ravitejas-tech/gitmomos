---
name: migration
description: Write the Supabase migration for a schema change, apply it locally, prove there is no drift and regenerate the types. Use when a table, column, policy, grant, function, enum, trigger or cron job changes.
argument-hint: <snake_case_name>
arguments: name
---

Write the migration for this branch's schema change, named `$name`: snake_case, describing the change, for example `timesheet_entries`.

1. Read "Migrations", "Tables", "Multiple writes are one SQL function" and "Row Level Security" in `.claude/rules/backend.md` first.
2. Create the file with `yarn supabase migration new $name`. Never edit, regenerate or delete an earlier migration: `20261015000000_v2_schema.sql` and everything after it may already have run on a hosted project, and production data must survive.
3. Write the SQL:
    - RLS enabled on every new table, with policies `to authenticated` comparing `(select auth.uid())` with the owning column;
    - the browser's writes column-scoped: revoke `insert, update` from `anon, authenticated`, then `grant update (...)` for exactly what the UI changes;
    - an operation that writes more than once is one `security definer` function with `set search_path = ''`, granted only to the roles that call it;
    - `timestamptz` for instants, `date` for calendar days, a Postgres enum for an option set;
    - an index only where an existing query needs it;
    - no explanatory comments.
4. Apply it with `yarn db:reset`. It needs the local Supabase in Docker; if that isn't running, stop and say so.
5. `yarn db:diff` must print nothing.
6. `yarn db:types` regenerates `app/types/database.ts` and `supabase/functions/_shared/database.types.ts`. They are committed with the migration.
7. Applying it to the hosted project is `yarn db:push`, only with the developer's yes. Never reset or dump the linked project.

Report the migration's file name and one line per statement.
