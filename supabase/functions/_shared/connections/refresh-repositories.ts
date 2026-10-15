import { HttpError } from '../http/http-error.ts'
import { createProvider } from '../providers/create-provider.ts'
import { ProviderAuthError } from '../providers/provider-auth-error.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ConnectionsRequestOf } from '../types/connections.types.ts'
import { importRepositories } from './import-repositories.ts'
import { markConnectionError } from './mark-connection-error.ts'

export async function refreshRepositories(userId: string, { connectionId }: ConnectionsRequestOf<'refresh_repos'>) {
    const admin = adminClient()
    const connection = unwrap(
        await admin
            .from('connections')
            .select('id, provider, base_url')
            .eq('id', connectionId)
            .eq('user_id', userId)
            .maybeSingle(),
    )
    if (!connection) throw new HttpError(404, 'Connection not found')

    const token = unwrap(await admin.rpc('get_connection_token', { p_connection_id: connection.id }))
    if (!token) throw new HttpError(400, 'Connection has no stored token. Please reconnect.')

    const provider = createProvider(connection.provider, connection.base_url, token)
    try {
        return { repositories: await importRepositories(connection.id, provider) }
    } catch (err) {
        if (!(err instanceof ProviderAuthError)) throw err
        await markConnectionError(connection.id, err.message)
        throw new HttpError(400, 'The stored token was rejected. Please reconnect.')
    }
}
