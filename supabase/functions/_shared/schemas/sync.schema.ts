import { z } from 'npm:zod@4'
import { INVALID_DATE_MESSAGE } from '../constants/sync.constants.ts'

export const syncRequestSchema = z.object({
    date: z.string({ error: INVALID_DATE_MESSAGE }).nullish(),
})

export const workerSyncRequestSchema = z.object({
    userId: z.guid({ error: 'userId is required' }),
})
