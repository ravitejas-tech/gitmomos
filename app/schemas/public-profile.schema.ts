import { z } from 'zod'
import {
    HANDLE_PATTERN,
    HANDLE_REQUIRED,
    HANDLE_RULES,
    QUESTION_MAX_LENGTH,
    TAGLINE_MAX_LENGTH,
} from '~/data/public-profile/constants'

export const publicProfileSchema = z.object({
    handle: z.string(),
    name: z.string(),
    tagline: z.string().nullable(),
    stats: z.object({
        commits: z.number(),
        active_days: z.number(),
        longest_streak: z.number(),
        projects: z.number(),
        reports: z.number(),
    }),
    daily: z.array(z.object({ date: z.string(), commits: z.number() })),
    recent: z.array(z.object({ date: z.string(), headline: z.string().nullable() })),
})

export const publicProfileSettingsSchema = z
    .object({
        isPublic: z.boolean(),
        handle: z
            .string()
            .trim()
            .toLowerCase()
            .refine((handle) => !handle || HANDLE_PATTERN.test(handle), HANDLE_RULES),
        tagline: z.string().trim().max(TAGLINE_MAX_LENGTH, `Keep it under ${TAGLINE_MAX_LENGTH} characters`),
    })
    .refine(({ isPublic, handle }) => !isPublic || handle, { path: ['handle'], error: HANDLE_REQUIRED })

export type PublicProfileSettingsData = z.infer<typeof publicProfileSettingsSchema>

export const questionSchema = z.object({
    question: z
        .string()
        .trim()
        .min(1, 'Ask a question')
        .max(QUESTION_MAX_LENGTH, `Keep it under ${QUESTION_MAX_LENGTH} characters`),
})

export type QuestionData = z.infer<typeof questionSchema>
