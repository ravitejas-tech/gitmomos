import type { ProjectFormData } from '~/schemas/project.schema'
import type { Project } from '~/types/projects'

export function projectFormValues(project: Project | undefined): ProjectFormData {
    return {
        name: project?.name ?? '',
        description: project?.description ?? '',
        url: project?.url ?? '',
        repositoryIds: project?.repository_ids ?? [],
        isPublic: project?.is_public ?? false,
        tracksMilestones: project?.tracks_milestones ?? true,
    }
}
