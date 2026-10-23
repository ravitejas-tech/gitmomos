import { z } from 'zod'

export const geminiKeySchema = z.object({
    apiKey: z.string().trim().min(1, 'Paste your API key'),
})

export type GeminiKeyData = z.infer<typeof geminiKeySchema>
