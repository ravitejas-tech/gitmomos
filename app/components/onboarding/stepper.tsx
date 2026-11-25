import { NumberedStep } from '~/components/ui/numbered-step'
import { ONBOARDING_STEPS } from '~/data/onboarding/steps'
import { stepState } from '~/lib/onboarding/step-state'
import type { OnboardingProgress, OnboardingStepId } from '~/types/onboarding'

export interface OnboardingStepperProps {
    current: OnboardingStepId
    done: OnboardingProgress
}

export function OnboardingStepper({ current, done }: OnboardingStepperProps) {
    return (
        <nav
            aria-label='Setup steps'
            className='self-start max-lg:hidden lg:sticky lg:top-12'>
            <ol className='space-y-4'>
                {ONBOARDING_STEPS.map(({ id, title }, index) => (
                    <NumberedStep
                        key={id}
                        step={index + 1}
                        title={title}
                        state={stepState(id, current, done[id])}
                    />
                ))}
            </ol>
        </nav>
    )
}
