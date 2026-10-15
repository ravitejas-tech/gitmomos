import type { ConnectionsRequestOf } from '../types/connections.types.ts'
import { normalizeGiteaUrl } from './gitea-url.ts'
import { saveConnection } from './save-connection.ts'

export function connectGitea(userId: string, { baseUrl, token }: ConnectionsRequestOf<'gitea_connect'>) {
    return saveConnection(userId, 'gitea', normalizeGiteaUrl(baseUrl), token)
}
