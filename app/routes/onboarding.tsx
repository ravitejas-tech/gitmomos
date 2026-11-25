import { RequireSession } from '~/components/auth/require-session'
import { OnboardingFlow } from '~/components/onboarding/flow'

export default function Onboarding() {
    return (
        <RequireSession>
            <OnboardingFlow />
        </RequireSession>
    )
}
