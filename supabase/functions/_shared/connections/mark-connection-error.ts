import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'

export async function markConnectionError(connectionId: string, message: string) {
    unwrap(
        await adminClient().from('connections').update({ status: 'error', last_error: message }).eq('id', connectionId),
    )
}
