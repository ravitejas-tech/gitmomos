import { DEFAULT_GEMINI_MODEL } from '../constants/gemini.constants.ts'
import { RESPONSE_SCHEMA } from '../constants/reports.constants.ts'
import { generateJson } from '../gemini/generate-json.ts'
import type { GeminiReport } from '../types/gemini.types.ts'
import type { ReportCommit, ReportContent } from '../types/report.types.ts'
import { buildPrompt } from './build-prompt.ts'

export async function generateReport(date: string, commits: ReportCommit[]): Promise<ReportContent> {
    const report = await generateJson<GeminiReport>({
        model: Deno.env.get('GEMINI_MODEL') ?? DEFAULT_GEMINI_MODEL,
        contents: [{ role: 'user', parts: [{ text: buildPrompt(date, commits) }] }],
        schema: RESPONSE_SCHEMA,
    })
    const summaries = new Map((report.repositories ?? []).map(({ name, summary }) => [name, summary]))

    return {
        headline: report.headline ?? '',
        summary: report.summary ?? '',
        highlights: report.highlights ?? [],
        key_work_areas: report.key_work_areas ?? [],
        suggestions: report.suggestions ?? [],
        repositories: [...Map.groupBy(commits, (commit) => commit.repository)].map(([name, repoCommits]) => ({
            name,
            commit_count: repoCommits.length,
            summary: summaries.get(name) ?? '',
        })),
    }
}
