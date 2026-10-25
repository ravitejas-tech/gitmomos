import type { NumberedStepProps } from '~/components/ui/numbered-step'
import type { AiKeyData } from '~/schemas/ai-key.schema'
import type { aiKeyService } from '~/services/ai-key.service'
import type { Enums } from '~/types/database'

export type AiProvider = Enums<'ai_provider'>

export type AiTask = 'report' | 'chat'

export type AiKey = NonNullable<Awaited<ReturnType<typeof aiKeyService.getAiKey>>>

export type AiCredentials = Pick<AiKeyData, 'provider'> & Partial<Pick<AiKeyData, 'apiKey'>>

export interface AiModelCatalog {
    models: { id: string; name: string }[]
    recommended: Record<AiTask, string>
}

export interface AiProviderGuide {
    label: string
    placeholder: string
    keysUrl: string
    keysLabel: string
    guideTitle: string
    steps: readonly Omit<NumberedStepProps, 'step'>[]
}
