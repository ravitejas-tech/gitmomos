import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useConnections, useRepositories } from '~/hooks/connections/queries'
import { connectionsService } from '~/services/connections.service'
import { queryClient } from '~/services/query-client'
import type { Repository } from '~/types/connections'

function refreshConnections() {
    queryClient.invalidateQueries({ queryKey: useConnections.getKey() })
    queryClient.invalidateQueries({ queryKey: useRepositories.getKey() })
}

function announceConnected() {
    toast.success('Connected')
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

export const useAddRepository = createMutation({
    mutationFn: (url: string) => connectionsService.addRepository(url),
    onSuccess: ({ fullName }) => {
        toast.success(`Added ${fullName}`)
        queryClient.invalidateQueries({ queryKey: useRepositories.getKey() })
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

export const useUntrackRepository = createMutation({
    mutationFn: ({ id }: Repository) => connectionsService.untrackRepository(id),
    onMutate: ({ id }) => {
        queryClient.setQueryData(useRepositories.getKey(), (repositories) =>
            repositories?.filter((repository) => repository.id !== id),
        )
    },
    onSuccess: (_, { full_name }) => toast.success(`Removed ${full_name}`),
    onError: (error) => {
        toast.error(error.message)
        queryClient.invalidateQueries({ queryKey: useRepositories.getKey() })
    },
})
