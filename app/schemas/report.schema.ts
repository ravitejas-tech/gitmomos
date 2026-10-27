import { z } from 'zod'

export const highlightSchema = z.object({ title: z.string(), detail: z.string() })

export const reportContentSchema = z.object({
    headline: z.string().default(''),
    brief: z.array(z.string()).default([]),
    summary: z.string(),
    highlights: z.array(highlightSchema).default([]),
    key_work_areas: z.array(z.string()).default([]),
    suggestions: z.array(z.string()).default([]),
    repositories: z.array(z.object({ name: z.string(), commit_count: z.number(), summary: z.string() })).default([]),
})

export type ReportContent = z.infer<typeof reportContentSchema>
export type ReportHighlight = ReportContent['highlights'][number]

export const reportEditSchema = z.object({
    headline: z.string().trim().min(1, 'Write a headline'),
    brief: z.string(),
    summary: z.string().trim().min(1, 'Write a summary'),
    highlights: z.array(
        z.object({
            title: z.string().trim().min(1, 'Give this highlight a title'),
            detail: z.string().trim(),
        }),
    ),
    key_work_areas: z.string(),
    suggestions: z.string(),
})

export type ReportEditData = z.infer<typeof reportEditSchema>
