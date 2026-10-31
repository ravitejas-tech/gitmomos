---
name: commit
description: Commit the working tree the way .claude/rules/git.md requires — one file per commit, Conventional Commits, no AI attribution — after the developer approves the batch.
disable-model-invocation: true
---

Read `.claude/rules/git.md` in full first.

1. Look at `git status --short` and the staged and unstaged diff. If the branch is `main`, stop and propose a branch name instead: `<type>/<short-slug>`, or `<type>/<number>-<slug>` for an issue.
2. Plan the sequence: one commit per file, in an order that keeps the tree coherent at every step (a module before the code importing it). Batch only what genuinely cannot be split, such as a migration with the generated types it produces, or a mechanical change spanning many files, such as a folder move, and say why in the body.
3. Write each message as `<type>(<scope>): <subject>`, with the scope `web`, `db` or `functions`, or none for a repo-wide change: imperative, lowercase after the colon, under 72 characters, naming the change rather than the file. Add a body explaining why whenever the subject isn't self-evident. Use `Refs #N` for an issue, never `Closes`, `Fixes` or `Resolves`. No `Co-Authored-By` and no AI attribution of any kind.
4. Show the whole plan, file → message, and **wait for an explicit yes for this batch**. Approval never carries over from an earlier batch.
5. Commit one file at a time with `git add <file>` and `git commit`.
6. The last commit must build: run `yarn build`, and `yarn functions:check` if `supabase/functions/` changed. Push or open a pull request only if the developer asked for it in this batch.
