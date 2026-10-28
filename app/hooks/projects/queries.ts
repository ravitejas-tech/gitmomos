import { createQuery } from 'react-query-kit'
import { projectsService } from '~/services/projects.service'
import type { PublicProjectQuery } from '~/types/projects'

export const useProjects = createQuery({
    queryKey: ['projects'],
    fetcher: () => projectsService.getProjects(),
})

export const useProjectMilestones = createQuery({
    queryKey: ['project-milestones'],
    fetcher: (repositoryIds: string[]) => projectsService.getMilestones(repositoryIds),
})

export const usePublicProjects = createQuery({
    queryKey: ['public-projects'],
    fetcher: (handle: string) => projectsService.getPublicProjects(handle),
})

export const usePublicProject = createQuery({
    queryKey: ['public-project'],
    fetcher: (query: PublicProjectQuery) => projectsService.getPublicProject(query),
})
