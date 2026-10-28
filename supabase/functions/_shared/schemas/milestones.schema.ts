import { z } from 'npm:zod@4'
import { reportContentSchema } from './report.schema.ts'

export const milestoneReportsSchema = z.array(
    z.object({
        id: z.string(),
        date: z.string(),
        updated_at: z.string(),
        content: reportContentSchema,
    }),
)

export type MilestoneReport = z.infer<typeof milestoneReportsSchema>[number]

export const milestoneReplySchema = z.object({
    milestones: z
        .array(z.object({ date: z.string(), repository: z.string(), title: z.string(), detail: z.string() }))
        .default([]),
})
