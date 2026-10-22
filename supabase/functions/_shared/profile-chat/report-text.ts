import type { ReportContent } from '../types/report.types.ts'

export function reportText({ headline, summary, highlights, key_work_areas, repositories }: ReportContent): string {
    return [
        headline,
        summary,
        ...highlights.map(({ title, detail }) => `- ${title}: ${detail}`),
        ...repositories.map(({ summary }) => `- ${summary}`),
        key_work_areas.length ? `Areas: ${key_work_areas.join(', ')}` : '',
    ]
        .filter(Boolean)
        .join('\n')
}
