import {
    AI_ROLES,
    CHAT_RESPONSE_SCHEMA,
    CHAT_UNAVAILABLE_MESSAGE,
    MAX_SOURCES,
    noReportsAnswer,
    PROFILE_NOT_FOUND_MESSAGE,
    QUESTIONS_PER_PROFILE_DAY,
    QUESTIONS_PER_VISITOR_HOUR,
    TOO_MANY_QUESTIONS_MESSAGE,
} from '../constants/profile-chat.constants.ts'
import { AiKeyError } from '../ai/ai-key-error.ts'
import { findAiKey } from '../ai/find-ai-key.ts'
import { generateJson } from '../ai/generate-json.ts'
import { HttpError } from '../http/http-error.ts'
import { localDate } from '../lib/dates.ts'
import { chatReplySchema, type ProfileChatRequest } from '../schemas/profile-chat.schema.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { AiKey } from '../types/ai.types.ts'
import type { ProfileAnswer, ProfileOwner, ProfileReport, PublicReport } from '../types/profile-chat.types.ts'
import { buildChatPrompt } from './build-chat-prompt.ts'
import { matchReports } from './match-reports.ts'

export async function answerQuestion(clientHash: string, request: ProfileChatRequest): Promise<ProfileAnswer> {
    const owner = await publicOwner(request.handle)
    const key = await findAiKey(owner.id)
    if (!key) throw new HttpError(503, CHAT_UNAVAILABLE_MESSAGE)

    await claimQuestion(owner.id, clientHash)
    return answerFromReports(owner, key, request).catch((err) => {
        throw err instanceof AiKeyError ? new HttpError(503, CHAT_UNAVAILABLE_MESSAGE) : err
    })
}

async function answerFromReports(
    owner: ProfileOwner,
    key: AiKey,
    { question, history }: ProfileChatRequest,
): Promise<ProfileAnswer> {
    const previous = history.findLast(({ role }) => role === 'visitor')?.text
    const reports = await matchReports(owner.id, key, [previous, question].filter(Boolean).join('\n'))
    if (!reports.length) return { answer: noReportsAnswer(owner.name), sources: [] }

    const reply = await generateJson(
        key,
        'chat',
        {
            system: buildChatPrompt(owner.name, localDate(owner.timezone), reports),
            messages: [...history, { role: 'visitor' as const, text: question }].map(({ role, text }) => ({
                role: AI_ROLES[role],
                text,
            })),
            schema: CHAT_RESPONSE_SCHEMA,
        },
        chatReplySchema,
    )
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
