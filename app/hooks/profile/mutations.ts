import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useProfile } from '~/hooks/profile/queries'
import { queryClient } from '~/services/query-client'
import { PROFILE_MEDIA } from '~/data/profile-media/constants'
import { profileMediaService } from '~/services/profile-media.service'
import { profileService } from '~/services/profile.service'

export const useUpdateProfile = createMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
        toast.success('Profile saved')
        queryClient.invalidateQueries({ queryKey: useProfile.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

export const useUploadProfileImage = createMutation({
    mutationFn: profileMediaService.upload,
    onSuccess: (_, { kind }) => {
        toast.success(PROFILE_MEDIA[kind].saved)
        queryClient.invalidateQueries({ queryKey: useProfile.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

export const useRemoveProfileImage = createMutation({
    mutationFn: profileMediaService.remove,
    onSuccess: (_, kind) => {
        toast.success(PROFILE_MEDIA[kind].removed)
        queryClient.invalidateQueries({ queryKey: useProfile.getKey() })
    },
    onError: (error) => toast.error(error.message),
})
