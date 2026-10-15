import { createQuery } from 'react-query-kit'
import { profileService } from '~/services/profile.service'

export const useProfile = createQuery({
    queryKey: ['profile'],
    fetcher: () => profileService.getProfile(),
})
