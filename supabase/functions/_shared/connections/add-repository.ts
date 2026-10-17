import { REPOSITORY_SEGMENT, REPOSITORY_URL_EXAMPLE } from '../constants/connections.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { parseGitUrl } from '../lib/parse-git-url.ts'
import { ProviderAuthError } from '../providers/provider-auth-error.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { AccountConnection, ConnectionsRequestOf } from '../types/connections.types.ts'
import type { ProviderRepo } from '../types/provider.types.ts'
import { connectionProvider } from './connection-provider.ts'
import { markConnectionError } from './mark-connection-error.ts'

export async function addRepository(userId: string, { url }: ConnectionsRequestOf<'add_repository'>) {
    const target = parseGitUrl(url)
    if (!target) throw new HttpError(400, `Enter a repository URL, e.g. ${REPOSITORY_URL_EXAMPLE}`)

    const connections = await hostConnections(userId, target)
    const fullName = repositoryName(target, connections[0].base_url)

    for (const connection of connections) {
        const repo = await findRepository(connection, fullName)
        if (repo) {
            await track(userId, connection.id, repo)
            return { fullName: repo.fullName }
        }
    }

    const logins = connections.map((connection) => connection.account_login).join(' or ')
    throw new HttpError(404, `Couldn't find ${fullName}. Check the URL and that ${logins} can access it.`)
}

async function hostConnections(userId: string, target: URL): Promise<[AccountConnection, ...AccountConnection[]]> {
    const host = bareHost(target.hostname)
    const connections = unwrap(
        await adminClient().from('connections').select('id, provider, base_url, account_login').eq('user_id', userId),
    ).filter((connection) => bareHost(new URL(connection.base_url).hostname) === host)

    const [first, ...rest] = connections
    if (!first) throw new HttpError(400, `Connect your ${host} account first`)
    return [first, ...rest]
}

function repositoryName(target: URL, baseUrl: string): string {
    const basePath = new URL(baseUrl).pathname.replace(/\/+$/, '')
    const path = target.pathname.startsWith(`${basePath}/`) ? target.pathname.slice(basePath.length) : target.pathname
    const [owner, name] = path.split('/').filter(Boolean)
    const repo = name?.replace(/\.git$/, '')

    if (!owner || !repo || ![owner, repo].every((segment) => REPOSITORY_SEGMENT.test(segment))) {
        throw new HttpError(400, `Enter the full repository URL, e.g. ${REPOSITORY_URL_EXAMPLE}`)
    }
    return `${owner}/${repo}`
}

async function findRepository(connection: AccountConnection, fullName: string): Promise<ProviderRepo | null> {
    try {
        return await (await connectionProvider(connection)).getRepo(fullName)
    } catch (err) {
        if (!(err instanceof ProviderAuthError)) throw err
        await markConnectionError(connection.id, err.message)
        throw new HttpError(400, `Access for ${connection.account_login} was revoked. Connect the account again.`)
    }
}

async function track(userId: string, connectionId: string, repo: ProviderRepo) {
    unwrap(
        await adminClient().from('repositories').upsert(
            {
                user_id: userId,
                connection_id: connectionId,
                external_id: repo.externalId,
                full_name: repo.fullName,
                html_url: repo.htmlUrl,
                default_branch: repo.defaultBranch,
                is_private: repo.isPrivate,
                pushed_at: repo.pushedAt,
                enabled: true,
            },
            { onConflict: 'connection_id,external_id' },
        ),
    )
}

function bareHost(hostname: string): string {
    return hostname.toLowerCase().replace(/^www\./, '')
}
