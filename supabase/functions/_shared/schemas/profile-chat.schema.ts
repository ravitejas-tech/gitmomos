import { z } from 'npm:zod@4'
import {
    CHAT_ROLES,
    HANDLE_PATTERN,
    MAX_HISTORY_CHARS,
    MAX_HISTORY_MESSAGES,
    MAX_QUESTION_CHARS,
    PROFILE_NOT_FOUND_MESSAGE,
    QUESTION_REQUIRED_MESSAGE,
    QUESTION_TOO_LONG_MESSAGE,
} from '../constants/profile-chat.constants.ts'

export const profileChatRequestSchema = z.object({
    handle: z
        .string({ error: PROFILE_NOT_FOUND_MESSAGE })
        .trim()
        .toLowerCase()
        .regex(HANDLE_PATTERN, PROFILE_NOT_FOUND_MESSAGE),
    question: z
        .string({ error: QUESTION_REQUIRED_MESSAGE })
        .trim()
        .min(1, QUESTION_REQUIRED_MESSAGE)
        .max(MAX_QUESTION_CHARS, QUESTION_TOO_LONG_MESSAGE),
    history: z
        .array(z.object({ role: z.enum(CHAT_ROLES), text: z.string().max(MAX_HISTORY_CHARS) }))
        .max(MAX_HISTORY_MESSAGES)
        .default([]),
})

export type ProfileChatRequest = z.infer<typeof profileChatRequestSchema>
