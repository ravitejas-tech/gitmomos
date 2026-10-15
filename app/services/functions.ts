import { FunctionsHttpError } from '@supabase/supabase-js'
import { supabase } from '~/services/supabase'

export async function invokeFunction<T>(name: string, body: Record<string, unknown>): Promise<T> {
    const { data, error } = await supabase.functions.invoke<T>(name, { body })
    if (!error) return data as T

    const payload = error instanceof FunctionsHttpError ? await error.context.json().catch(() => null) : null
    throw new Error(payload?.error ?? error.message)
}
