import type { ReactNode } from 'react'
import { Navigate, useMatch } from 'react-router'
import { LoadingState } from '~/components/ui/loading-state'
import { GITHUB_CALLBACK_PATH, ONBOARDING_PATH } from '~/data/navigation'
import { useProfile } from '~/hooks/profile/queries'

export function OnboardingGate({ children }: { children: ReactNode }) {
    const { data: profile, isPending } = useProfile()
    const isGitHubCallback = useMatch(GITHUB_CALLBACK_PATH) !== null

    if (isPending) return <LoadingState fullScreen />

    if (profile && !profile.onboarded_at && !isGitHubCallback) {
        return (
            <Navigate
                to={ONBOARDING_PATH}
                replace
            />
        )
    }

    return children
}
