import { PLAIN_WORDS_RULE } from '../constants/reports.constants.ts'
import type { MilestoneReport } from '../schemas/milestones.schema.ts'

export function buildMilestonePrompt(reports: MilestoneReport[]): string {
    return `You read a software developer's daily work reports and pick out their milestones: the few moments in a
project that someone looking at the developer's portfolio, such as a recruiter or a client, would want to know about.

A milestone is a finished step that people outside the team can see, for example:
- launching a product, app or website, or putting out a public release or a new major version
- submitting or publishing an app to the App Store or Google Play
- going live in production for the first time, or moving users onto a new system
- shipping a whole feature that people can now use, such as payments, sign-in, search or an admin panel
- an integration with an outside service going live, such as a payment provider or a bank
- finishing a large migration or rewrite

These are not milestones: bug fixes, refactoring, small features and tweaks, tests, dependency updates, styling,
documentation, work in progress, and anything that only starts or continues a piece of work. Most days have no
milestone. When unsure, leave it out. If the same achievement shows up on several days, keep only the day it
was finished.

How to write:
- title: what was achieved, at most 8 words, past tense, sentence case, no full stop. A plain statement such as
  "Published the Android app on Google Play".
- detail: 1-2 plain sentences on what was done, using only what the report says. No praise, no claims about
  impact and no made-up numbers.
${PLAIN_WORDS_RULE}
- Refer to a project by what it is ("the mobile app"), never by its repository name.

Return JSON with:
- milestones: a list, often empty. Each item has "date" (the date of the report it comes from, exactly as
  given), "repository" (the one repository of that report the milestone belongs to, exactly as listed),
  "title" and "detail".

Reports:

${reports.map(reportEntry).join('\n\n')}`
}

function reportEntry({ date, content: { headline, summary, highlights, repositories } }: MilestoneReport): string {
    return [
        `### ${date}`,
        headline,
        summary,
        ...highlights.map(({ title, detail }) => `- ${title}: ${detail}`),
        'Repositories:',
        ...repositories.map(({ name, summary }) => `- ${name}: ${summary}`),
    ]
        .filter(Boolean)
        .join('\n')
}
