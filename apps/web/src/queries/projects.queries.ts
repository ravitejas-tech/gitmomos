import { createQuery } from 'react-query-kit';
import { projectsService } from '../services/projects.service';

export const useProjects = createQuery({
    queryKey: ['projects'],
    fetcher: () => projectsService.getProjects(),
});

export const useProjectDetail = createQuery<any, string>({
    queryKey: ['project'],
    fetcher: (id: string) => projectsService.getProjectById(id),
});

export const useProjectCommits = createQuery<any, { projectId: string; page?: number }>({
    queryKey: ['project-commits'],
    fetcher: ({ projectId, page }) => projectsService.getProjectCommits(projectId, page),
});
