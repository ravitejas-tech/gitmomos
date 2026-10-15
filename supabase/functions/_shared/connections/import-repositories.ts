import type { Provider } from '../types/provider.types.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'

export async function importRepositories(connectionId: string, provider: Provider): Promise<number> {
    const repos = await provider.listRepos()
    return unwrap(
        await adminClient().rpc('import_repositories', {
            p_connection_id: connectionId,
            p_repositories: repos.map((repo) => ({
                external_id: repo.externalId,
                full_name: repo.fullName,
                html_url: repo.htmlUrl,
                default_branch: repo.defaultBranch,
                is_private: repo.isPrivate,
                pushed_at: repo.pushedAt,
            })),
        }),
    )
}
