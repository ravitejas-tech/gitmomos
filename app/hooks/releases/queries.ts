import { createQuery } from 'react-query-kit'
import { releasesService } from '~/services/releases.service'

export const useReleases = createQuery({
    queryKey: ['releases'],
    fetcher: () => releasesService.getReleases(),
})
