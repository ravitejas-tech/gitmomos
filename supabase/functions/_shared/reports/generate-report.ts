import { REPORT_MODELS, REPORT_TIMEOUT_MS } from '../constants/gemini.constants.ts'
import { RESPONSE_SCHEMA } from '../constants/reports.constants.ts'
import { generateJson } from '../gemini/generate-json.ts'
import { modelChain } from '../gemini/model-chain.ts'
import type { GeminiReport } from '../types/gemini.types.ts'
import type { ReportCommit, ReportContent } from '../types/report.types.ts'
import { buildPrompt } from './build-prompt.ts'

export async function generateReport(apiKey: string, date: string, commits: ReportCommit[]): Promise<ReportContent> {
    const report = await generateJson<GeminiReport>({
        apiKey,
        models: modelChain(Deno.env.get('GEMINI_MODEL'), REPORT_MODELS),
        timeoutMs: REPORT_TIMEOUT_MS,
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
