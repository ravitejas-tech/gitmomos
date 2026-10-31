---
name: issue
description: Start work on a GitHub issue — read it, list what it asks for and how each point will be checked, look for earlier decisions it touches, and branch from main. Use when starting work on an issue.
argument-hint: <issue number, link or pasted text>
---

Issue: $ARGUMENTS

1. Get the full issue with `gh issue view <number> --comments`. If you can't read it, ask the developer to paste it.
2. Before writing any code, list every behaviour the issue asks for and how each one will be checked by hand.
3. Search `CLAUDE.md`, the rulebooks, `docs/` and the code for earlier decisions the issue touches. Where one conflicts, say which, and ask before changing it.
4. Branch from the latest `main` as `<type>/<number>-<slug>`, for example `feat/12-gitea-oauth`. One branch per issue.
5. Build what the issue asks for and nothing more. An extra or a deviation needs the developer's approval first.
6. Finish with `/handover`, walking every listed behaviour. Commits and pull requests say `Refs #<number>`, never `Closes`, `Fixes` or `Resolves`.
