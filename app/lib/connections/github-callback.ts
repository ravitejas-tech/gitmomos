export function githubCallbackError(params: URLSearchParams): string | null {
    if (params.get('error')) return params.get('error_description') ?? 'GitHub authorization was cancelled.'
    if (!params.get('code') || !params.get('state')) return 'GitHub did not return an authorization code.'
    return null
}
