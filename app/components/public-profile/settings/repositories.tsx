import { FolderGit2 } from 'lucide-react'
import { Link } from 'react-router'
import { ProfileRepositoryRow } from '~/components/public-profile/settings/repository-row'
import { SettingsSection } from '~/components/settings/settings-section'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { CONNECTIONS_PATH } from '~/data/navigation'
import { useRepositories } from '~/hooks/connections/queries'

export function ProfileRepositories() {
    const { data: repositories } = useRepositories()

    return (
        <SettingsSection
            title='Repositories'
            description='A day’s report is shown only when every repository in it is switched on.'
            isLoading={!repositories}>
            {repositories?.length === 0 && (
                <EmptyState
                    tone='plain'
                    icon={FolderGit2}
                    title='No repositories yet'
                    action={
                        <Button
                            asChild
                            variant='secondary'>
                            <Link to={CONNECTIONS_PATH}>Add a repository</Link>
                        </Button>
                    }
                />
            )}
            {!!repositories?.length && (
                <ul className='divide-y divide-border'>
                    {repositories.map((repository) => (
                        <ProfileRepositoryRow
                            key={repository.id}
                            repository={repository}
                        />
                    ))}
                </ul>
            )}
        </SettingsSection>
    )
}
