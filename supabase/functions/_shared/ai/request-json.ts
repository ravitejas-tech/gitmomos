import { AI_API_URLS, AI_AUTH_HEADERS, AI_PROVIDER_NAMES, aiNoAnswerMessage } from '../constants/ai.constants.ts'
import { errorMessage } from '../lib/error-message.ts'
import type { AiProvider, ProviderRequest } from '../types/ai.types.ts'
import { AiUnavailableError } from './ai-unavailable-error.ts'
import { providerError } from './provider-error.ts'

export async function requestJson<T>(
    provider: AiProvider,
    apiKey: string,
    path: string,
    { timeoutMs, body }: ProviderRequest,
): Promise<T> {
    const res = await fetch(`${AI_API_URLS[provider]}/${path}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers: { 'Content-Type': 'application/json', ...AI_AUTH_HEADERS[provider](apiKey) },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
    }).catch((err) => {
        throw new AiUnavailableError(504, `${aiNoAnswerMessage(AI_PROVIDER_NAMES[provider])}: ${errorMessage(err)}`)
    })
    if (!res.ok) throw await providerError(provider, res)
    return res.json()
}
