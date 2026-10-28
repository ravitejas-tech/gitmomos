import { FolderKanban, Plus } from 'lucide-react'
import { ProjectListCard } from '~/components/projects/list/card'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { Skeleton } from '~/components/ui/skeleton'
import { LOADING_ROWS } from '~/data/public-profile/constants'
import { useProjects } from '~/hooks/projects/queries'

export function ProjectGrid({ onCreate }: { onCreate: () => void }) {
    const { data: projects, isError, refetch } = useProjects()

    if (isError) return <ErrorState onRetry={() => refetch()} />

    if (projects?.length === 0) {
        return (
            <EmptyState
                icon={FolderKanban}
                title='No projects yet'
                description='Group repositories into a project to collect its milestones and share them on your profile.'
                action={
                    <Button onClick={onCreate}>
                        <Plus />
                        New project
                    </Button>
                }
            />
        )
    }

    return (
        <div className='grid gap-6 md:grid-cols-2 2xl:grid-cols-3'>
            {projects
                ? projects.map((project) => (
                      <ProjectListCard
                          key={project.id}
                          project={project}
                      />
                  ))
                : LOADING_ROWS.map((row) => (
                      <Skeleton
                          key={row}
                          className='h-40'
                      />
                  ))}
        </div>
    )
}
