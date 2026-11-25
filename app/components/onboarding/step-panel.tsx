import { OnboardingStepActions } from '~/components/onboarding/step-actions'
import { PageHeader } from '~/components/ui/page-header'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { ONBOARDING_STEP_COMPONENTS } from '~/data/onboarding/step-components'
import { ONBOARDING_STEPS } from '~/data/onboarding/steps'
import type { OnboardingProgress, OnboardingStep, OnboardingStepId } from '~/types/onboarding'

export interface OnboardingStepPanelProps {
    step: OnboardingStep
    done: OnboardingProgress
    onNavigate: (id: OnboardingStepId) => void
}

export function OnboardingStepPanel({ step, done, onNavigate }: OnboardingStepPanelProps) {
    const index = ONBOARDING_STEPS.indexOf(step)
    const StepContent = ONBOARDING_STEP_COMPONENTS[step.id]

    return (
        <section className='min-w-0'>
            <div className='mb-6 space-y-2 lg:hidden'>
                <Text variant='label'>
                    Step {index + 1} of {ONBOARDING_STEPS.length}
                </Text>
                <ProgressBar value={((index + 1) / ONBOARDING_STEPS.length) * 100} />
            </div>
            <PageHeader
                title={step.title}
                description={step.description}
                actions={
                    <OnboardingStepActions
                        previous={ONBOARDING_STEPS[index - 1]}
                        next={ONBOARDING_STEPS[index + 1]}
                        canContinue={done[step.id]}
                        onNavigate={onNavigate}
                    />
                }
            />
            <StepContent />
        </section>
    )
}
