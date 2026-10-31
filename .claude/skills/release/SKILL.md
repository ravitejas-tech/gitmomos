---
name: release
description: Release a version the way .claude/rules/git.md › Versions and releases requires — pick the bump, commit the version, draft the notes, then tag and publish the GitHub release once the developer says yes.
argument-hint: '[patch | minor]'
disable-model-invocation: true
---

Read "Versions and releases" in `.claude/rules/git.md` first.

1. Find what shipped since the last release: `gh release list --limit 1` gives its tag, then `git log --oneline <tag>..origin/main`.
2. Pick the bump: `patch` for a fix, copy change or internal change, `minor` for a new feature or a changed behaviour. Never `major` without asking. Use $ARGUMENTS if given.
3. Bump `version` in `package.json` and nothing else, as its own commit `chore(release): vX.Y.Z` on a branch, merged through a pull request (`/commit`). The landing page shows this version, so a tag without the bump leaves the site on the old one.
4. Draft the notes in the shape of the previous release (`gh release view <tag>`): a `# Description` for the people who use gitmomos, an action-needed note when users or self-hosters must do something, then `## ✨ What's New` grouped by feature. Say what changed for a user, not which files moved. Show the draft and wait.
5. Once the release commit is on `main`, and only with the developer's yes for this step: `git tag vX.Y.Z <commit>`, `git push origin vX.Y.Z`, then `gh release create vX.Y.Z --title "<title>" --notes-file <file>`. The `/releases` page reads the published release.
6. Check that the tag, the `version` in `package.json` on `main` and the published release name the same version.
