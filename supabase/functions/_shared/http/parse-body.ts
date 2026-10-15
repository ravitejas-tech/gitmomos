import type { z } from 'npm:zod@4'
import { HttpError } from './http-error.ts'

export function parseBody<T extends z.ZodType>(schema: T, body: unknown): z.output<T> {
    const result = schema.safeParse(body)
    if (!result.success) throw new HttpError(400, result.error.issues[0]?.message ?? 'Invalid request')
    return result.data
}
