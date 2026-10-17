import { createProvider } from '../providers/create-provider.ts'
import { ProviderAuthError } from '../providers/provider-auth-error.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ProviderConnection } from '../types/connections.types.ts'
import type { Provider } from '../types/provider.types.ts'

export async function connectionProvider({ id, provider, base_url }: ProviderConnection): Promise<Provider> {
    const token = unwrap(await adminClient().rpc('get_connection_token', { p_connection_id: id }))
    if (!token) throw new ProviderAuthError('No stored token')
    return createProvider(provider, base_url, token)
}
