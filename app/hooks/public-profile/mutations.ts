import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useRepositories } from '~/hooks/connections/queries'
import { useProfile } from '~/hooks/profile/queries'
import { publicProfileService } from '~/services/public-profile.service'
import { queryClient } from '~/services/query-client'

export const useUpdatePublicProfile = createMutation({
    mutationFn: publicProfileService.updateSettings,
    onSuccess: () => {
        toast.success('Public profile saved')
        queryClient.invalidateQueries({ queryKey: useProfile.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

export const useShowRepositoryOnProfile = createMutation({
    mutationFn: publicProfileService.showRepository,
    onMutate: ({ id, onProfile }) => {
        queryClient.setQueryData(useRepositories.getKey(), (repositories) =>
            repositories?.map((repository) =>
                repository.id === id ? { ...repository, on_profile: onProfile } : repository,
            ),
        )
    },
    onSuccess: (_, { onProfile }) => toast.success(onProfile ? 'Shown on your profile' : 'Hidden from your profile'),
    onError: (error) => {
        toast.error(error.message)
        queryClient.invalidateQueries({ queryKey: useRepositories.getKey() })
    },
})

export const useAskProfile = createMutation({
    mutationFn: publicProfileService.ask,
    onError: (error) => toast.error(error.message),
})
