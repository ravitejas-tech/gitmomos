import { createQuery } from 'react-query-kit'
import { connectionsService } from '~/services/connections.service'

export const useConnections = createQuery({
    queryKey: ['connections'],
    fetcher: () => connectionsService.getConnections(),
})

export const useRepositories = createQuery({
    queryKey: ['repositories'],
    fetcher: () => connectionsService.getRepositories(),
})
