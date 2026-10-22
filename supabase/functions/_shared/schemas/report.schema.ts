import { z } from 'npm:zod@4'
import type { ReportContent } from '../types/report.types.ts'

export const reportContentSchema = z.object({
    headline: z.string().default(''),
    summary: z.string().default(''),
    highlights: z.array(z.object({ title: z.string(), detail: z.string() })).default([]),
    key_work_areas: z.array(z.string()).default([]),
    suggestions: z.array(z.string()).default([]),
    repositories: z.array(z.object({ name: z.string(), commit_count: z.number(), summary: z.string() })).default([]),
}) satisfies z.ZodType<ReportContent>
