# Claude Code on this repo

gitmomos keeps its Claude Code setup in `.claude/`, committed with the code, so every session follows the same rules, offers the same commands and asks before the same risky steps. Tested with Claude Code 2.1.186.

## What's in `.claude/`

```
.claude/
  settings.json        shared permissions and git attribution
  rules/               the rulebooks
  agents/              reviewers Claude delegates to
  skills/              slash commands
```

### Rulebooks

The rulebooks are the files in `.claude/rules/`. Claude loads each one on its own; the `paths` list at the top of a file decides when.

| Rulebook | Loads when |
|---|---|
| `global.md` | every session |
| `frontend.md` | a file in `app/` or `react-router.config.ts` is opened |
| `backend.md` | a file in `supabase/` is opened |
| `git.md` | `package.json` is opened, and by `/commit` and `/release` |

They are written for people too: read the one for an area before your first change in it.

### Agents

| Agent | Does |
|---|---|
| `rulebook-reviewer` | Reviews the branch's changes against `CLAUDE.md` and the rulebooks; reports each broken rule with file:line |

It is read-only. Claude uses it on its own when a change is finished, or ask for it by name.

### Slash commands

| Command | Does |
|---|---|
| `/issue <n or text>` | Lists what a GitHub issue asks for, checks earlier decisions, branches from `main` |
| `/migration <name>` | Writes the migration, applies it locally, proves there is no drift and regenerates the types |
| `/handover` | Build, lint, function checks, drift, both themes and the reviewer, then the steps to test by hand |
| `/commit` | Plans one commit per file with Conventional Commit messages, waits for your yes, commits |
| `/release [patch or minor]` | Bumps the version and drafts the notes, then tags and publishes once you say yes |

`/commit` and `/release` run only when you type them; Claude never starts them on its own.

### Permissions

| Setting | Effect |
|---|---|
| Allowed | `yarn ts:check`, `yarn lint`, `yarn build`, `yarn functions:check` and `git status/diff/log/show` run without a prompt |
| Always asks | `git commit`, `git push`, `git tag`, `gh pr create`, `gh release`, `yarn db:push`, `yarn functions:deploy`, `yarn secrets:set` |
| Blocked | force pushes, `npm install` (Yarn only), resetting the linked database, editing the baseline migration, reading `.env` files |
| `attribution` | no `Co-Authored-By` trailer or "Generated with Claude Code" line |

Claude reads `.env.example` and `supabase/functions/.env.example` to learn which variables exist; the values in `.env` and `supabase/functions/.env` stay out of its context.

## First run

Open Claude Code in the repo root and accept the folder trust prompt. The allowed commands apply only after that.

## Personal settings

Keep your own preferences out of the shared files:

- `.claude/settings.local.json`: your extra permissions, model or hooks.
- `CLAUDE.local.md` at the repo root: your own notes for Claude.

Both are gitignored.

## Changing the setup

Change `.claude/` like any code: a branch, a pull request, review. To change a rule, edit its rulebook in `.claude/rules/`. A new rulebook needs a `paths` list, unless it should load in every session, and a row in the Rulebooks table in `CLAUDE.md`.
