import { z } from 'zod'
import { Constants } from '~/types/database'

export const workKindSchema = z.enum(Constants.public.Enums.work_kind)

export const activitySchema = z.object({
    daily: z.array(
        z.object({
            date: z.string(),
            commits: z.number(),
            kinds: z.partialRecord(workKindSchema, z.number()),
        }),
    ),
    repositories: z.array(z.object({ name: z.string(), commits: z.number() })),
    kinds: z.array(z.object({ kind: workKindSchema, commits: z.number() })),
    hours: z.array(z.object({ hour: z.number(), commits: z.number() })),
    previous: z.object({ commits: z.number(), active_days: z.number() }),
})
