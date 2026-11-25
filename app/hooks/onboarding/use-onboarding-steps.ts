import { useSearchParams } from 'react-router'
import { useAiKey } from '~/hooks/ai-key/queries'
import { useConnections, useRepositories } from '~/hooks/connections/queries'
import { useProfile } from '~/hooks/profile/queries'
import { ONBOARDING_STEP_PARAM, ONBOARDING_STEPS } from '~/data/onboarding/steps'
import { hasSynced } from '~/lib/connections/synced'
import type { OnboardingProgress, OnboardingStepId } from '~/types/onboarding'

export function useOnboardingSteps() {
    const [params, setParams] = useSearchParams()
    const connections = useConnections()
    const repositories = useRepositories()
    const aiKey = useAiKey()
    const profile = useProfile()
    const queries = [connections, repositories, aiKey, profile]

    const done: OnboardingProgress = {
        connect: Boolean(connections.data?.length),
        repositories: Boolean(repositories.data?.length),
        ai: Boolean(aiKey.data),
        sync: hasSynced(repositories.data),
        profile: Boolean(profile.data?.is_public),
    }
    const open = ONBOARDING_STEPS.findIndex(({ id }) => !done[id])
    const reachable = ONBOARDING_STEPS.slice(0, open === -1 ? undefined : open + 1)
    const requested = params.get(ONBOARDING_STEP_PARAM)
    const current = reachable.find(({ id }) => id === requested) ?? reachable.at(-1) ?? ONBOARDING_STEPS[0]

    return {
        isLoading: queries.some((query) => query.isPending),
        isError: queries.some((query) => query.isError),
        retry: () => queries.forEach((query) => query.refetch()),
        done,
        current,
        isPinned: requested === current.id,
        goTo: (id: OnboardingStepId) => setParams({ [ONBOARDING_STEP_PARAM]: id }),
    }
}
