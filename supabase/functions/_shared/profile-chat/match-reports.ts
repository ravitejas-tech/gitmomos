import { RECENT_REPORTS, SIMILAR_REPORTS } from '../constants/profile-chat.constants.ts'
import { embedTexts } from '../gemini/embed-texts.ts'
import { reportContentSchema } from '../schemas/report.schema.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { AiKey } from '../types/ai.types.ts'
import type { ProfileReport } from '../types/profile-chat.types.ts'
import { questionEmbeddingText } from './embedding-text.ts'
import { indexReports } from './index-reports.ts'

export async function matchReports(
    userId: string,
    { provider, apiKey }: AiKey,
    query: string,
): Promise<ProfileReport[]> {
    const reports =
        provider === 'gemini' ? await closestInMeaning(userId, apiKey, query) : await closestInWords(userId, query)
    return reports.map(({ date, content }) => ({ date, content: reportContentSchema.parse(content) }))
}

async function closestInMeaning(userId: string, apiKey: string, query: string) {
    await indexReports(userId, apiKey)
    const [embedding = []] = await embedTexts(apiKey, [questionEmbeddingText(query)])
    return unwrap(
        await adminClient().rpc('match_profile_reports', {
            p_user_id: userId,
            p_embedding: JSON.stringify(embedding),
            p_similar: SIMILAR_REPORTS,
            p_recent: RECENT_REPORTS,
        }),
    )
}

async function closestInWords(userId: string, query: string) {
    return unwrap(
        await adminClient().rpc('match_profile_reports_by_text', {
            p_user_id: userId,
            p_query: query,
            p_similar: SIMILAR_REPORTS,
            p_recent: RECENT_REPORTS,
        }),
    )
}
