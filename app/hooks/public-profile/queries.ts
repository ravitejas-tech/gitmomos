import { createQuery } from 'react-query-kit'
import { publicProfileService } from '~/services/public-profile.service'

export const usePublicProfile = createQuery({
    queryKey: ['public-profile'],
    fetcher: (handle: string) => publicProfileService.getPublicProfile(handle),
})
