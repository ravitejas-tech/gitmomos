import type { ComponentType } from 'react'
import { AiProviderStep } from '~/components/onboarding/steps/ai-provider'
import { ConnectStep } from '~/components/onboarding/steps/connect'
import { ProfileStep } from '~/components/onboarding/steps/profile'
import { RepositoriesStep } from '~/components/onboarding/steps/repositories'
import { SyncStep } from '~/components/onboarding/steps/sync'
import type { OnboardingStepId } from '~/types/onboarding'

export const ONBOARDING_STEP_COMPONENTS: Record<OnboardingStepId, ComponentType> = {
    connect: ConnectStep,
    repositories: RepositoriesStep,
    ai: AiProviderStep,
    sync: SyncStep,
    profile: ProfileStep,
}
