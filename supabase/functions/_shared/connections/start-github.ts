import { GITHUB_AUTHORIZE_URL, GITHUB_SCOPES } from '../constants/providers.constants.ts'
import { requireEnv } from '../lib/env.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'

export async function startGitHub(userId: string) {
    const state = crypto.randomUUID() + crypto.randomUUID()
    unwrap(await adminClient().from('oauth_states').insert({ state, user_id: userId, provider: 'github' }))

    const params = new URLSearchParams({
        client_id: requireEnv('GITHUB_CLIENT_ID'),
        scope: GITHUB_SCOPES,
        state,
        allow_signup: 'false',
    })
    return { url: `${GITHUB_AUTHORIZE_URL}?${params}` }
}
