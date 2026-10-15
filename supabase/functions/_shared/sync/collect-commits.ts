import { REPO_CONCURRENCY } from '../constants/sync.constants.ts'
import { markConnectionError } from '../connections/mark-connection-error.ts'
import { errorMessage } from '../lib/error-message.ts'
import { mapLimit } from '../lib/map-limit.ts'
import { createProvider } from '../providers/create-provider.ts'
import { ProviderAuthError } from '../providers/provider-auth-error.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { CommitQuery, CommitWindow, Provider } from '../types/provider.types.ts'
import type { SyncConnection, SyncRepository } from '../types/sync.types.ts'

export async function collectCommits(userId: string, window: CommitWindow): Promise<string[]> {
    const errors: string[] = []
    for (const connection of await enabledConnections(userId)) {
        errors.push(...(await collectConnection(connection, window)))
    }
    return errors
}

async function enabledConnections(userId: string): Promise<SyncConnection[]> {
    return unwrap(
        await adminClient()
            .from('connections')
            .select('id, provider, base_url, repositories!inner(id, full_name)')
            .eq('user_id', userId)
            .eq('repositories.enabled', true),
    )
}

async function collectConnection(connection: SyncConnection, window: CommitWindow): Promise<string[]> {
    const errors: string[] = []
    try {
        const provider = await connectionProvider(connection)
        const query = { ...window, account: await provider.getAccount() }

        await mapLimit(connection.repositories, REPO_CONCURRENCY, async (repo) => {
            try {
                await recordRepository(provider, repo, query)
            } catch (err) {
                if (err instanceof ProviderAuthError) throw err
                errors.push(`${repo.full_name}: ${errorMessage(err)}`)
            }
        })

        unwrap(
            await adminClient()
                .from('connections')
                .update({ status: 'active', last_error: null, last_synced_at: new Date().toISOString() })
                .eq('id', connection.id),
        )
    } catch (err) {
        const message = errorMessage(err)
        errors.push(`${connection.base_url}: ${message}`)
        if (err instanceof ProviderAuthError) await markConnectionError(connection.id, message)
    }
    return errors
}

async function connectionProvider({ id, provider, base_url }: SyncConnection): Promise<Provider> {
    const token = unwrap(await adminClient().rpc('get_connection_token', { p_connection_id: id }))
    if (!token) throw new ProviderAuthError('No stored token')
    return createProvider(provider, base_url, token)
}

async function recordRepository(provider: Provider, repo: SyncRepository, query: CommitQuery) {
    const commits = await provider.listCommits(repo.full_name, query)
    unwrap(
        await adminClient().rpc('record_repository_commits', {
            p_repository_id: repo.id,
            p_commits: commits.map((commit) => ({
                sha: commit.sha,
                message: commit.message,
                author_name: commit.authorName,
                author_email: commit.authorEmail,
                committed_at: commit.committedAt,
                html_url: commit.htmlUrl,
            })),
        }),
    )
}
