import { HttpError } from '../http/http-error.ts'

export function requireEnv(name: string): string {
    const value = Deno.env.get(name)
    if (!value) throw new HttpError(500, `Missing required secret: ${name}`)
    return value
}
