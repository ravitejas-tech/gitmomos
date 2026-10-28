import { z } from 'zod'
import { memberSchema } from '~/schemas/community.schema'

export const leaderboardSchema = z.object({
    total: z.number(),
    people: z.array(memberSchema.extend({ commits: z.number(), rank: z.number() })),
})
