import { USER_AGENT } from '../constants/providers.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { ProviderAuthError } from './provider-auth-error.ts'

export async function request<T>(url: string, headers: Record<string, string>): Promise<T> {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, ...headers } })
    if (res.status === 401) throw new ProviderAuthError('Access token was rejected')
    if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new HttpError(502, `${res.status} ${res.statusText} from ${new URL(url).host}: ${body.slice(0, 200)}`)
    }
    return await res.json()
}
