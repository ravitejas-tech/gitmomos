import type { Repository } from '~/types/connections'

export function hasSynced(repositories: Repository[] | undefined): boolean {
    return Boolean(repositories?.some((repository) => repository.last_synced_at))
}
