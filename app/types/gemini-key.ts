import type { geminiKeyService } from '~/services/gemini-key.service'

export type GeminiKey = NonNullable<Awaited<ReturnType<typeof geminiKeyService.getGeminiKey>>>
