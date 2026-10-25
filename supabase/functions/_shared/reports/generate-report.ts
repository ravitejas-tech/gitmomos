import { RESPONSE_SCHEMA } from '../constants/reports.constants.ts'
import { generateJson } from '../ai/generate-json.ts'
import { generatedReportSchema } from '../schemas/report.schema.ts'
import type { AiKey } from '../types/ai.types.ts'
import type { ReportCommit, ReportContent } from '../types/report.types.ts'
import { buildPrompt } from './build-prompt.ts'

export async function generateReport(key: AiKey, date: string, commits: ReportCommit[]): Promise<ReportContent> {
    const { repositories, ...report } = await generateJson(
        key,
        'report',
        { messages: [{ role: 'user', text: buildPrompt(date, commits) }], schema: RESPONSE_SCHEMA },
        generatedReportSchema,
    )
    const summaries = new Map(repositories.map(({ name, summary }) => [name, summary]))

    return {
        ...report,
        repositories: [...Map.groupBy(commits, (commit) => commit.repository)].map(([name, repoCommits]) => ({
            name,
            commit_count: repoCommits.length,
            summary: summaries.get(name) ?? '',
        })),
    }
}
