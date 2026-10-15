import type { User } from 'npm:@supabase/supabase-js@2'
import { HttpError } from '../http/http-error.ts'
import { adminClient } from './admin-client.ts'

export async function requireUser(req: Request): Promise<User> {
    const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
    if (!token) throw new HttpError(401, 'Missing Authorization header')

    const { data, error } = await adminClient().auth.getUser(token)
    if (error || !data.user) throw new HttpError(401, 'Invalid or expired session')
    return data.user
}
