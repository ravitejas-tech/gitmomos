import { Link } from 'react-router'
import { FolderX } from 'lucide-react'
import { PublicProjectHeader } from '~/components/public-profile/project/header'
import { PublicMilestones } from '~/components/public-profile/project/milestones'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { usePublicProject } from '~/hooks/projects/queries'
import { profilePath } from '~/lib/public-profile/handle'
import type { PublicProjectQuery } from '~/types/projects'

export function PublicProjectView({ handle, slug }: PublicProjectQuery) {
    const { data: project, isPending, isError, refetch } = usePublicProject({ variables: { handle, slug } })

    return (
        <Container
            size='document'
            className='space-y-12 py-8 lg:py-12'>
            {isPending && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {project === null && (
                <EmptyState
                    icon={FolderX}
                    title='This project isn’t shared'
                    description='It may have been made private, or the link is wrong.'
                    action={
                        <Button
                            asChild
                            variant='secondary'>
                            <Link to={profilePath(handle)}>Back to the profile</Link>
                        </Button>
                    }
                />
            )}
            {project && (
                <>
                    <PublicProjectHeader project={project} />
                    <PublicMilestones project={project} />
                </>
            )}
        </Container>
    )
}
