import { DEFAULT_GEMINI_MODEL, GEMINI_API_URL, RESPONSE_SCHEMA } from '../constants/reports.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { requireEnv } from '../lib/env.ts'
import type { GeminiReport, GeminiResponse } from '../types/gemini.types.ts'
import type { ReportCommit, ReportContent } from '../types/report.types.ts'
import { buildPrompt } from './build-prompt.ts'

export async function generateReport(date: string, commits: ReportCommit[]): Promise<ReportContent> {
    const report = await requestReport(buildPrompt(date, commits))
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

async function requestReport(prompt: string): Promise<GeminiReport> {
    const apiKey = requireEnv('GEMINI_API_KEY')
    const model = Deno.env.get('GEMINI_MODEL') ?? DEFAULT_GEMINI_MODEL

    const res = await fetch(`${GEMINI_API_URL}/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
        }),
    })
    if (!res.ok) throw new HttpError(502, `Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`)

    const data: GeminiResponse = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('')
    if (!text) throw new HttpError(502, 'Gemini returned an empty response')
    return JSON.parse(text)
}
