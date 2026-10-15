import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useProfile } from '~/hooks/profile/queries'
import { queryClient } from '~/services/query-client'
import { profileService } from '~/services/profile.service'

export const useUpdateProfile = createMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
        toast.success('Profile saved')
        queryClient.invalidateQueries({ queryKey: useProfile.getKey() })
    },
    onError: (error) => toast.error(error.message),
})
