import type { Enums } from '../database.types.ts'
import type { Provider } from '../types/provider.types.ts'
import { GiteaProvider } from './gitea-provider.ts'
import { GitHubProvider } from './github-provider.ts'

const PROVIDERS: Record<Enums<'provider_name'>, (baseUrl: string, token: string) => Provider> = {
    github: (_baseUrl, token) => new GitHubProvider(token),
    gitea: (baseUrl, token) => new GiteaProvider(baseUrl, token),
}

export function createProvider(provider: Enums<'provider_name'>, baseUrl: string, token: string): Provider {
    return PROVIDERS[provider](baseUrl, token)
}
