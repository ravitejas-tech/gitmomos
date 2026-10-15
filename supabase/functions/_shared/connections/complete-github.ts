import { STATE_TTL_MS } from '../constants/connections.constants.ts'
import { GITHUB_TOKEN_URL, GITHUB_WEB_URL } from '../constants/providers.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { requireEnv } from '../lib/env.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ConnectionsRequestOf } from '../types/connections.types.ts'
import type { GitHubTokenResponse } from '../types/github.types.ts'
import { saveConnection } from './save-connection.ts'

export async function completeGitHub(userId: string, { code, state }: ConnectionsRequestOf<'github_callback'>) {
    await consumeState(userId, state)
    return saveConnection(userId, 'github', GITHUB_WEB_URL, await exchangeCode(code))
}

async function consumeState(userId: string, state: string) {
    const saved = unwrap(
        await adminClient()
            .from('oauth_states')
            .delete()
            .eq('state', state)
            .eq('user_id', userId)
            .select('created_at')
            .maybeSingle(),
    )
    if (!saved || Date.now() - Date.parse(saved.created_at) > STATE_TTL_MS) {
        throw new HttpError(400, 'This GitHub authorization has expired. Please try connecting again.')
    }
}

async function exchangeCode(code: string): Promise<string> {
    const res = await fetch(GITHUB_TOKEN_URL, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: requireEnv('GITHUB_CLIENT_ID'),
            client_secret: requireEnv('GITHUB_CLIENT_SECRET'),
            code,
        }),
    })
    const { access_token, error_description }: GitHubTokenResponse = await res.json()
    if (!access_token) throw new HttpError(400, error_description ?? 'GitHub did not return an access token')
    return access_token
}
