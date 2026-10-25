import { z } from 'zod'
import { Constants } from '~/types/database'

export const aiKeySchema = z.object({
    provider: z.enum(Constants.public.Enums.ai_provider),
    apiKey: z.string().trim().min(1, 'Paste your API key'),
})

export type AiKeyData = z.infer<typeof aiKeySchema>

export const aiModelsSchema = z.object({
    reportModel: z.string().min(1, 'Choose a model'),
    chatModel: z.string().min(1, 'Choose a model'),
})

export type AiModelsData = z.infer<typeof aiModelsSchema>
