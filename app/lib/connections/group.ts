import type { Connection, Repository } from '~/types/connections'

export function groupRepositories(connections: Connection[], repositories: Repository[], search: string) {
    const query = search.trim().toLowerCase()
    return connections.map((connection) => {
        const owned = repositories.filter((repository) => repository.connection_id === connection.id)
        return {
            connection,
            totalCount: owned.length,
            enabledCount: owned.filter((repository) => repository.enabled).length,
            repositories: owned.filter((repository) => repository.full_name.toLowerCase().includes(query)),
        }
    })
}
