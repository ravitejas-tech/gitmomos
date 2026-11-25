import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useProfile } from '~/hooks/profile/queries'
import { onboardingService } from '~/services/onboarding.service'
import { queryClient } from '~/services/query-client'

export const useCompleteOnboarding = createMutation({
    mutationFn: () => onboardingService.complete(),
    onSuccess: () => {
        toast.success('You’re all set')
        return queryClient.invalidateQueries({ queryKey: useProfile.getKey() })
    },
    onError: (error) => toast.error(error.message),
})
