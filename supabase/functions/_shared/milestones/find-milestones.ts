import { MILESTONES_RESPONSE_SCHEMA } from '../constants/milestones.constants.ts'
import { generateJson } from '../ai/generate-json.ts'
import { milestoneReplySchema, type MilestoneReport } from '../schemas/milestones.schema.ts'
import type { AiKey } from '../types/ai.types.ts'
import type { FoundMilestone } from '../types/milestones.types.ts'
import { buildMilestonePrompt } from './build-milestone-prompt.ts'

export async function findMilestones(key: AiKey, reports: MilestoneReport[]): Promise<FoundMilestone[]> {
    const { milestones } = await generateJson(
        key,
        'report',
        { messages: [{ role: 'user', text: buildMilestonePrompt(reports) }], schema: MILESTONES_RESPONSE_SCHEMA },
        milestoneReplySchema,
    )
    const reportsByDate = new Map(reports.map((report) => [report.date, report]))

    return milestones.flatMap(({ date, repository, title, detail }) => {
        const report = reportsByDate.get(date)
        const belongs = report?.content.repositories.some(({ name }) => name === repository)
        return report && belongs && title.trim()
            ? [{ report_id: report.id, repository, title: title.trim(), detail: detail.trim() }]
            : []
    })
}
