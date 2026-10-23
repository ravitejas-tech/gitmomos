import { z } from 'zod'
import { highlightSchema } from '~/schemas/report.schema'
import {
    HANDLE_PATTERN,
    HANDLE_REQUIRED,
    HANDLE_RULES,
    QUESTION_MAX_LENGTH,
    TAGLINE_MAX_LENGTH,
} from '~/data/public-profile/constants'

const text = z
    .string()
    .nullish()
    .transform((value) => value ?? '')

const reportListingSchema = z.object({
    date: z.string(),
    headline: text,
    summary: text,
    highlights: z.array(highlightSchema),
    key_work_areas: z.array(z.string()),
})

export const publicProfileSchema = z.object({
    handle: z.string(),
    name: z.string(),
    tagline: z.string().nullable(),
    avatar_path: z.string().nullable(),
    banner_path: z.string().nullable(),
    can_ask: z.boolean(),
    since: z.string().nullable(),
    stats: z.object({
        commits: z.number(),
        active_days: z.number(),
        longest_streak: z.number(),
        projects: z.number(),
        reports: z.number(),
    }),
    shipped: z.array(z.object({ date: z.string(), title: text, detail: text, area: z.string().nullable() })),
    areas: z.array(z.object({ name: z.string(), reports: z.number() })),
    daily: z.array(z.object({ date: z.string(), commits: z.number() })),
    recent: z.array(z.object({ date: z.string(), headline: text })),
})

export const reportSearchSchema = z.object({
    name: z.string(),
    total: z.number(),
    reports: z.array(reportListingSchema),
})

export const publicReportSchema = reportListingSchema.extend({
    handle: z.string(),
    name: z.string(),
    previous: z.string().nullable(),
    next: z.string().nullable(),
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
