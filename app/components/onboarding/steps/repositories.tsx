import { RepositoriesCard } from '~/components/connections/repositories/card'
import { useRepositories } from '~/hooks/connections/queries'

export function RepositoriesStep() {
    const { data: repositories } = useRepositories()

    return <RepositoriesCard repositories={repositories} />
}
