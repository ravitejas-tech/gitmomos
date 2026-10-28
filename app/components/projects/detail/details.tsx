import { ProjectAboutCard } from '~/components/projects/detail/about-card'
import { MilestonesCard } from '~/components/projects/detail/milestones-card'
import type { Project } from '~/types/projects'

export function ProjectDetails({ project }: { project: Project }) {
    return (
        <div className='grid items-start gap-6 xl:grid-cols-3'>
            <MilestonesCard
                project={project}
                className='xl:col-span-2'
            />
            <ProjectAboutCard project={project} />
        </div>
    )
}
