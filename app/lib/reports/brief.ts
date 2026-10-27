import type { ReportContent } from '~/schemas/report.schema'

export const reportBrief = ({ brief, highlights }: ReportContent): string[] =>
    brief.length ? brief : highlights.map(({ title }) => title)

export const briefToText = (points: string[]) => points.map((point) => `- ${point}`).join('\n')
