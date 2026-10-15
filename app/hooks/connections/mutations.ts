import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useConnections, useRepositories } from '~/hooks/connections/queries'
import { pluralize } from '~/lib/format'
import { connectionsService } from '~/services/connections.service'
import { queryClient } from '~/services/query-client'
import type { ConnectResult } from '~/types/connections'

function refreshConnections() {
    queryClient.invalidateQueries({ queryKey: useConnections.getKey() })
    queryClient.invalidateQueries({ queryKey: useRepositories.getKey() })
}

function announceConnected({ repositories }: ConnectResult) {
    toast.success(`Connected. ${pluralize(repositories, 'repository', 'repositories')} found`)
    refreshConnections()
}

export const useStartGitHub = createMutation({
    mutationFn: () => connectionsService.startGitHub(),
    onSuccess: (url) => window.location.assign(url),
    onError: (error) => toast.error(error.message),
})

export const useCompleteGitHub = createMutation({
    mutationFn: (params: { code: string; state: string }) => connectionsService.completeGitHub(params),
    onSuccess: announceConnected,
})

export const useConnectGitea = createMutation({
    mutationFn: connectionsService.connectGitea,
    onSuccess: announceConnected,
    onError: (error) => toast.error(error.message),
})

export const useRefreshRepositories = createMutation({
    mutationFn: (connectionId: string) => connectionsService.refreshRepositories(connectionId),
    onSuccess: ({ repositories }) => {
        toast.success(`${pluralize(repositories, 'repository', 'repositories')} found`)
        refreshConnections()
    },
    onError: (error) => toast.error(error.message),
})

export const useDisconnect = createMutation({
    mutationFn: (connectionId: string) => connectionsService.disconnect(connectionId),
    onSuccess: () => {
        toast.success('Disconnected')
        refreshConnections()
    },
    onError: (error) => toast.error(error.message),
})

export const useSetRepositoryEnabled = createMutation({
    mutationFn: connectionsService.setRepositoryEnabled,
    onMutate: ({ id, enabled }) => {
        queryClient.setQueryData(useRepositories.getKey(), (repositories) =>
            repositories?.map((repository) => (repository.id === id ? { ...repository, enabled } : repository)),
        )
    },
    onError: (error) => {
        toast.error(error.message)
        queryClient.invalidateQueries({ queryKey: useRepositories.getKey() })
    },
})
