import { useState } from 'react'
import { Link } from 'react-router'
import { FolderX } from 'lucide-react'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { ProjectActions } from '~/components/projects/detail/actions'
import { ProjectDetails } from '~/components/projects/detail/details'
import { ProjectModal } from '~/components/projects/form/modal'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { PROJECTS_PATH } from '~/data/navigation'
import { useProjects } from '~/hooks/projects/queries'
import type { Route } from './+types/projects.$id'

export default function ProjectPage({ params }: Route.ComponentProps) {
    const [isEditing, setEditing] = useState(false)
    const { data: projects, isPending, isError, refetch } = useProjects()
    const project = projects?.find(({ id }) => id === params.id)

    return (
        <DashboardPage
            title={project?.name ?? 'Project'}
            actions={
                project && (
                    <ProjectActions
                        project={project}
                        onEdit={() => setEditing(true)}
                    />
                )
            }>
            {isPending && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {projects && !project && (
                <EmptyState
                    icon={FolderX}
                    title='This project doesn’t exist'
                    action={
                        <Button
                            asChild
                            variant='secondary'>
                            <Link to={PROJECTS_PATH}>Back to projects</Link>
                        </Button>
                    }
                />
            )}
            {project && <ProjectDetails project={project} />}
            {project && isEditing && (
                <ProjectModal
                    project={project}
                    onClose={() => setEditing(false)}
                />
            )}
        </DashboardPage>
    )
}
