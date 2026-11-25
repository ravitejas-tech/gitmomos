import type { ONBOARDING_STEPS } from '~/data/onboarding/steps'

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export type OnboardingStepId = OnboardingStep['id']

export type OnboardingProgress = Record<OnboardingStepId, boolean>
