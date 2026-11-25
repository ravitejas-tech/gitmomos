import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { useCompleteOnboarding } from '~/hooks/onboarding/mutations'
import type { OnboardingStep, OnboardingStepId } from '~/types/onboarding'

export interface OnboardingStepActionsProps {
    previous: OnboardingStep | undefined
    next: OnboardingStep | undefined
    canContinue: boolean
    onNavigate: (id: OnboardingStepId) => void
}

export function OnboardingStepActions({ previous, next, canContinue, onNavigate }: OnboardingStepActionsProps) {
    const { mutate: complete, isPending } = useCompleteOnboarding()

    return (
        <>
            {previous && (
                <Button
                    variant='secondary'
                    onClick={() => onNavigate(previous.id)}>
                    <ArrowLeft />
                    Back
                </Button>
            )}
            {next ? (
                <Button
                    onClick={() => onNavigate(next.id)}
                    disabled={!canContinue}>
                    Next
                    <ArrowRight />
                </Button>
            ) : (
                <Button
                    onClick={() => complete()}
                    disabled={isPending}>
                    {isPending && <Spinner />}
                    Go to dashboard
                </Button>
            )}
        </>
    )
}
