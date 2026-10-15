import { MAX_COMMITS, MAX_MESSAGE_CHARS } from '../constants/reports.constants.ts'
import type { ReportCommit } from '../types/report.types.ts'

export function buildPrompt(date: string, commits: ReportCommit[]): string {
    const sections = [...Map.groupBy(commits.slice(0, MAX_COMMITS), (commit) => commit.repository)]
        .map(([repo, repoCommits]) => {
            const lines = repoCommits.map(
                ({ message }) => `- ${message.slice(0, MAX_MESSAGE_CHARS).replace(/\n+/g, ' / ')}`,
            )
            return `## ${repo}\n${lines.join('\n')}`
        })
        .join('\n\n')

    return `You write a software developer's daily work report from their git commits on ${date}.

The developer shares this report with people who are not engineers: managers, clients and colleagues
in other roles. Write so that someone who has never seen code understands what was done and why it matters.

Style:
- First person ("I"), plain and confident, like a short status update written by a thoughtful colleague.
- Describe outcomes for users, customers or the team, not implementation. Say "customers can now pay with a
  saved card", not "added setup intents to the checkout service".
- No jargon: no commit hashes, file, function or library names, and no words like refactor, merge, PR,
  endpoint, migration, schema, CI, lint or dependency. If a technical idea is essential, explain it in everyday words.
- Group related commits into one piece of work. Routine upkeep (version bumps, formatting, tooling) is one
  short mention at most, never a highlight.
- Only describe work the commits show. Do not invent impact, numbers or results.

Return JSON with:
- headline: the day's main outcome in at most 10 words, sentence case, no full stop.
- summary: 2-3 sentences that tell the story of the day.
- highlights: 2-5 items, most important first. "title" is the outcome in at most 8 words; "detail" is 1-2
  sentences on what changed and why it matters.
- key_work_areas: up to 4 short plain-language labels for the parts of the product touched (for example
  "Payments", "Sign-in", "Reliability").
- suggestions: up to 3 sensible next steps, in plain language.
- repositories: one entry per repository below, with "name" exactly as given and a one-sentence plain-language "summary".

Commits:

${sections}`
}
