import type { PostgrestSingleResponse } from 'npm:@supabase/supabase-js@2'
import { HttpError } from '../http/http-error.ts'

export function unwrap<T>(result: PostgrestSingleResponse<T>): T {
    if (result.error) throw new HttpError(500, result.error.message)
    return result.data
}
