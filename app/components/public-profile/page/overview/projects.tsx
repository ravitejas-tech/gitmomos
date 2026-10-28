import { CircleCheck, Milestone } from 'lucide-react'
import { ProjectCard } from '~/components/projects/card'
import { OverviewSection } from '~/components/public-profile/page/overview/section'
import { MetaItem } from '~/components/ui/meta-item'
import { pluralize } from '~/lib/format'
import { projectPath } from '~/lib/public-profile/handle'
import type { PublicProjectSummary } from '~/types/projects'

export interface ProfileProjectsProps {
    handle: string
    projects: PublicProjectSummary[]
}

export function ProfileProjects({ handle, projects }: ProfileProjectsProps) {
    return (
        <OverviewSection title='Projects'>
            <div className='grid gap-6 md:grid-cols-2'>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        to={projectPath(handle, project.slug)}
                        name={project.name}
                        description={project.description}>
                        <MetaItem icon={Milestone}>{pluralize(project.milestones, 'milestone')}</MetaItem>
                        {project.latest && <MetaItem icon={CircleCheck}>{project.latest.title}</MetaItem>}
                    </ProjectCard>
                ))}
            </div>
        </OverviewSection>
    )
}
