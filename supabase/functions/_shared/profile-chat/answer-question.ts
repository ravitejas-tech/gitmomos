import { CHAT_MODELS, CHAT_TIMEOUT_MS } from '../constants/gemini.constants.ts'
import {
    CHAT_RESPONSE_SCHEMA,
    CHAT_UNAVAILABLE_MESSAGE,
    GEMINI_ROLES,
    MAX_SOURCES,
    noReportsAnswer,
    PROFILE_NOT_FOUND_MESSAGE,
    QUESTIONS_PER_PROFILE_DAY,
    QUESTIONS_PER_VISITOR_HOUR,
    RECENT_REPORTS,
    SIMILAR_REPORTS,
    TOO_MANY_QUESTIONS_MESSAGE,
} from '../constants/profile-chat.constants.ts'
import { embedTexts } from '../gemini/embed-texts.ts'
import { findGeminiKey } from '../gemini/find-gemini-key.ts'
import { GeminiKeyError } from '../gemini/gemini-key-error.ts'
import { generateJson } from '../gemini/generate-json.ts'
import { modelChain } from '../gemini/model-chain.ts'
import { HttpError } from '../http/http-error.ts'
import { localDate } from '../lib/dates.ts'
import type { ProfileChatRequest } from '../schemas/profile-chat.schema.ts'
import { reportContentSchema } from '../schemas/report.schema.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type {
    ChatReply,
    ProfileAnswer,
    ProfileOwner,
    ProfileReport,
    PublicReport,
} from '../types/profile-chat.types.ts'
import { buildChatPrompt } from './build-chat-prompt.ts'
import { questionEmbeddingText } from './embedding-text.ts'
import { indexReports } from './index-reports.ts'

export async function answerQuestion(clientHash: string, request: ProfileChatRequest): Promise<ProfileAnswer> {
    const owner = await publicOwner(request.handle)
    const apiKey = await findGeminiKey(owner.id)
    if (!apiKey) throw new HttpError(503, CHAT_UNAVAILABLE_MESSAGE)

    await claimQuestion(owner.id, clientHash)
    return answerFromReports(owner, apiKey, request).catch((err) => {
        throw err instanceof GeminiKeyError ? new HttpError(503, CHAT_UNAVAILABLE_MESSAGE) : err
    })
}

async function answerFromReports(
    owner: ProfileOwner,
    apiKey: string,
    { question, history }: ProfileChatRequest,
): Promise<ProfileAnswer> {
    await indexReports(owner.id, apiKey)

    const previous = history.findLast(({ role }) => role === 'visitor')?.text
    const reports = await matchReports(owner.id, apiKey, [previous, question].filter(Boolean).join('\n'))
    if (!reports.length) return { answer: noReportsAnswer(owner.name), sources: [] }

    const reply = await generateJson<ChatReply>({
        apiKey,
        models: modelChain(Deno.env.get('GEMINI_CHAT_MODEL'), CHAT_MODELS),
        timeoutMs: CHAT_TIMEOUT_MS,
        system: buildChatPrompt(owner.name, localDate(owner.timezone), reports),
        contents: [...history, { role: 'visitor' as const, text: question }].map(({ role, text }) => ({
            role: GEMINI_ROLES[role],
            parts: [{ text }],
        })),
        schema: CHAT_RESPONSE_SCHEMA,
    })
    return { answer: reply.answer, sources: citedReports(reports, reply.sources) }
}

async function publicOwner(handle: string): Promise<ProfileOwner> {
    const owner = unwrap(
        await adminClient()
            .from('profiles')
            .select('id, full_name, timezone')
            .eq('handle', handle)
            .eq('is_public', true)
            .maybeSingle(),
    )
    if (!owner) throw new HttpError(404, PROFILE_NOT_FOUND_MESSAGE)
    return { id: owner.id, name: owner.full_name?.trim() || handle, timezone: owner.timezone }
}

async function claimQuestion(userId: string, clientHash: string) {
    const allowed = unwrap(
        await adminClient().rpc('claim_profile_question', {
            p_user_id: userId,
            p_client_hash: clientHash,
            p_hourly_limit: QUESTIONS_PER_VISITOR_HOUR,
            p_daily_limit: QUESTIONS_PER_PROFILE_DAY,
        }),
    )
    if (!allowed) throw new HttpError(429, TOO_MANY_QUESTIONS_MESSAGE)
}

async function matchReports(userId: string, apiKey: string, query: string): Promise<ProfileReport[]> {
    const [embedding = []] = await embedTexts(apiKey, [questionEmbeddingText(query)])
    const reports = unwrap(
        await adminClient().rpc('match_profile_reports', {
            p_user_id: userId,
            p_embedding: JSON.stringify(embedding),
            p_similar: SIMILAR_REPORTS,
            p_recent: RECENT_REPORTS,
        }),
    )
    return reports.map(({ date, content }) => ({ date, content: reportContentSchema.parse(content) }))
}

function citedReports(reports: ProfileReport[], dates: string[]): PublicReport[] {
    return [...new Set(dates)]
        .flatMap((date) => reports.filter((report) => report.date === date))
        .slice(0, MAX_SOURCES)
        .map(({ date, content: { headline, summary, highlights, key_work_areas } }) => ({
            date,
            headline,
            summary,
            highlights,
            key_work_areas,
        }))
}
