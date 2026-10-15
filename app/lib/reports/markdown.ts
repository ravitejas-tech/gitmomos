import { formatDay } from '~/lib/format'
import type { ReportContent } from '~/schemas/report.schema'

const section = (title: string, items: string[]) =>
    items.length ? ['', `**${title}**`, ...items.map((item) => `- ${item}`)] : []

export function reportToMarkdown(date: string, content: ReportContent): string {
    return [
        `## ${content.headline || formatDay(date)}`,
        `_${formatDay(date)}_`,
        '',
        content.summary,
        ...section(
            'Highlights',
            content.highlights.map(({ title, detail }) => (detail ? `**${title}.** ${detail}` : `**${title}**`)),
        ),
        ...section(
            'By project',
            content.repositories.map(({ name, summary }) => (summary ? `${name}: ${summary}` : name)),
        ),
        ...section('Next steps', content.suggestions),
    ].join('\n')
}
