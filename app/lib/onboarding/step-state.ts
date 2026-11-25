import type { NumberedStepState } from '~/components/ui/numbered-step'
import type { OnboardingStepId } from '~/types/onboarding'

export function stepState(id: OnboardingStepId, current: OnboardingStepId, done: boolean): NumberedStepState {
    if (id === current) return 'current'
    return done ? 'done' : 'upcoming'
}
