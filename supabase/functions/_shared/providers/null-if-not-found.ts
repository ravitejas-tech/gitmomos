import { ProviderNotFoundError } from './provider-not-found-error.ts'

export async function nullIfNotFound<T>(promise: Promise<T>): Promise<T | null> {
    try {
        return await promise
    } catch (err) {
        if (err instanceof ProviderNotFoundError) return null
        throw err
    }
}
