import { Navigate } from 'react-router'
import { BrandBar } from '~/components/layout/brand-bar'
import { LogoutButton } from '~/components/layout/logout-button'
import { OnboardingStepPanel } from '~/components/onboarding/step-panel'
import { OnboardingStepper } from '~/components/onboarding/stepper'
import { Container } from '~/components/ui/container'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { DASHBOARD_PATH } from '~/data/navigation'
import { ONBOARDING_STEP_PARAM } from '~/data/onboarding/steps'
import { useOnboardingSteps } from '~/hooks/onboarding/use-onboarding-steps'
import { useProfile } from '~/hooks/profile/queries'

export function OnboardingFlow() {
    const { data: profile } = useProfile()
    const { isLoading, isError, retry, done, current, isPinned, goTo } = useOnboardingSteps()

    if (profile?.onboarded_at) {
        return (
            <Navigate
                to={DASHBOARD_PATH}
                replace
            />
        )
    }

    if (isLoading) return <LoadingState fullScreen />

    if (!isPinned) {
        return (
            <Navigate
                to={{ search: `?${ONBOARDING_STEP_PARAM}=${current.id}` }}
                replace
            />
        )
    }

    return (
        <div className='min-h-screen bg-bg'>
            <BrandBar
                actions={
                    <>
                        <ThemeToggle />
                        <LogoutButton />
                    </>
                }
            />
            <Container
                size='document'
                className='grid gap-10 py-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:py-12'>
                <OnboardingStepper
                    current={current.id}
                    done={done}
                />
                {isError ? (
                    <ErrorState onRetry={retry} />
                ) : (
                    <OnboardingStepPanel
                        step={current}
                        done={done}
                        onNavigate={goTo}
                    />
                )}
            </Container>
        </div>
    )
}
