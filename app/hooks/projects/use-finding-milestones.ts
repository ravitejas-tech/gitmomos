import { useIsMutating } from '@tanstack/react-query'
import { useFindMilestones } from '~/hooks/projects/mutations'

export function useFindingMilestones(): boolean {
    return useIsMutating({ mutationKey: useFindMilestones.getKey() }) > 0
}
