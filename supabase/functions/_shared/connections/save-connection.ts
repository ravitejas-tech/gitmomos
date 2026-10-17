import type { Enums } from '../database.types.ts'
import { HttpError } from '../http/http-error.ts'
import { createProvider } from '../providers/create-provider.ts'
import { ProviderAuthError } from '../providers/provider-auth-error.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'

export async function saveConnection(
    userId: string,
    providerName: Enums<'provider_name'>,
    baseUrl: string,
    token: string,
) {
    const provider = createProvider(providerName, baseUrl, token)
    const account = await provider.getAccount().catch((err) => {
        if (err instanceof ProviderAuthError) throw new HttpError(400, 'That access token was rejected')
        throw new HttpError(400, `Could not reach ${baseUrl}: ${err.message}`)
    })

    const connectionId = unwrap(
        await adminClient().rpc('save_connection', {
            p_user_id: userId,
            p_provider: providerName,
            p_base_url: baseUrl,
            p_account_login: account.login,
            p_token: token,
            p_account_name: account.name ?? undefined,
            p_avatar_url: account.avatarUrl ?? undefined,
        }),
    )
    return { connectionId }
}
