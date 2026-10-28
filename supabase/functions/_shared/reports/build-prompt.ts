import { MAX_COMMIT_CHARS, MAX_MESSAGE_CHARS, PLAIN_WORDS_RULE } from '../constants/reports.constants.ts'
import type { ReportCommit } from '../types/report.types.ts'

export function buildPrompt(date: string, commits: ReportCommit[]): string {
    const full = commitSections(commits, fullMessage)
    const sections =
        full.length <= MAX_COMMIT_CHARS ? full : commitSections(commits, subjectLine).slice(0, MAX_COMMIT_CHARS)

    return `You write a software developer's end-of-day work update from their git commits on ${date}.

The developer sends it to their manager, team lead or client. It must read like something the developer
wrote themselves in a few minutes: plain, specific and honest. Someone outside engineering should be able
to follow it, and someone on the team should learn exactly what was done.

How to write:
- First person ("I"), past tense, short sentences, everyday words. Write the way people write in a team
  chat, not the way a company writes a press release.
- Be specific. Name the feature, page, screen, bug or part of the product that changed and say what was
  done to it. Write "Fixed the bug where the invoice total ignored discounts", not "Improved billing accuracy".
- Say what was done, not why it is great. No praise, no selling, no claims about impact or results that
  the commits do not state, and no made-up numbers.
${PLAIN_WORDS_RULE}
- Common technical words are fine when they are the clearest name for something (API, database, login,
  tests, bug, release). Leave out commit hashes, file, function and branch names, and prefixes like "feat:".
- Refer to a project by what it is ("the mobile app", "the billing service"), never by its repository
  name, except in "repositories".
- Cover every piece of real work in the commits. Never drop work to keep the report short: a busy day
  gets a longer report.
- Group commits that belong to the same piece of work. Small upkeep (version bumps, formatting, config)
  gets one short mention at most, never a highlight.
- Changesets, release notes, docs updates and merge commits mostly repeat other commits. Use them to
  understand the work, but do not list them as separate work.
- If a commit message is too vague to tell what changed ("wip", "fixes", "update"), do not guess. Mention
  it briefly or leave it out.
- Do not repeat the same sentence in different fields.

Return JSON with:
- headline: what the day was mostly about, at most 10 words, sentence case, no full stop. A plain
  statement, not a slogan, for example "Fixed checkout bugs and added saved cards".
- brief: 3-4 bullet points the developer can paste straight into a standup or a chat message. Each is one
  line of at most 12 words, starts with a past-tense verb (Fixed, Added, Updated, Removed...), covers a
  different piece of work and has no full stop. Use fewer only when the day had fewer pieces of work.
- summary: 3-6 sentences describing what was worked on, most important first, longer on busier days.
- highlights: one item per separate piece of work, up to 10, most important first. "title" says what was
  done in at most 8 words; "detail" is 2-3 sentences on exactly what changed: what was added, fixed or
  removed, and where in the product.
- key_work_areas: up to 4 short labels for the parts of the product touched (for example "Payments",
  "Sign-in", "Admin dashboard").
- suggestions: up to 3 follow-ups, only when the commits show unfinished work (a "wip" commit, a temporary
  fix, a TODO). Otherwise an empty list. Do not invent next steps.
- repositories: one entry per repository below, with "name" exactly as given and a one-sentence plain
  "summary" of what was done in it.

Commits:

${sections}`
}

function commitSections(commits: ReportCommit[], describe: (message: string) => string): string {
    return [...Map.groupBy(commits, (commit) => commit.repository)]
        .map(
            ([repo, repoCommits]) =>
                `## ${repo}\n${repoCommits.map(({ message }) => `- ${describe(message)}`).join('\n')}`,
        )
        .join('\n\n')
}

function fullMessage(message: string): string {
    return message.slice(0, MAX_MESSAGE_CHARS).replace(/\n+/g, ' / ')
}

function subjectLine(message: string): string {
    return message.split('\n')[0] ?? ''
}
