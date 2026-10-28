import { FolderGit2, Loader, Milestone } from 'lucide-react'
import { ProjectCard } from '~/components/projects/card'
import { ProjectVisibilityBadge } from '~/components/projects/visibility-badge'
import { MetaItem } from '~/components/ui/meta-item'
import { pluralize } from '~/lib/format'
import { projectSettingsPath } from '~/lib/projects/paths'
import type { Project } from '~/types/projects'

export function ProjectListCard({ project }: { project: Project }) {
    return (
        <ProjectCard
            to={projectSettingsPath(project.id)}
            name={project.name}
            description={project.description}
            badge={<ProjectVisibilityBadge isPublic={project.is_public} />}>
            <MetaItem icon={Milestone}>{pluralize(project.milestones, 'milestone')}</MetaItem>
            <MetaItem icon={FolderGit2}>
                {pluralize(project.repository_ids.length, 'repository', 'repositories')}
            </MetaItem>
            {project.pending > 0 && <MetaItem icon={Loader}>Checking {pluralize(project.pending, 'report')}</MetaItem>}
        </ProjectCard>
    )
}
