import type { connectionsService } from '~/services/connections.service'

export type Connection = Awaited<ReturnType<typeof connectionsService.getConnections>>[number]
export type Repository = Awaited<ReturnType<typeof connectionsService.getRepositories>>[number]

export interface ConnectResult {
    connectionId: string
    repositories: number
}
