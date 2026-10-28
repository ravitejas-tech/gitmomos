import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useProjectMilestones, useProjects, usePublicProject, usePublicProjects } from '~/hooks/projects/queries'
import { pluralize } from '~/lib/format'
import { projectsService } from '~/services/projects.service'
import { queryClient } from '~/services/query-client'

const refreshProjects = () => {
    for (const key of [
        useProjects.getKey(),
        useProjectMilestones.getKey(),
        usePublicProjects.getKey(),
        usePublicProject.getKey(),
    ]) {
        queryClient.invalidateQueries({ queryKey: key })
    }
}

export const useSaveProject = createMutation({
    mutationFn: projectsService.saveProject,
    onSuccess: () => {
        toast.success('Project saved')
        refreshProjects()
    },
    onError: (error) => toast.error(error.message),
})

export const useDeleteProject = createMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
        toast.success('Project deleted')
        refreshProjects()
    },
    onError: (error) => toast.error(error.message),
})

export const useSetMilestoneHidden = createMutation({
    mutationFn: projectsService.setMilestoneHidden,
    onSuccess: (_, { hidden }) => {
        toast.success(hidden ? 'Milestone hidden' : 'Milestone shown')
        refreshProjects()
    },
    onError: (error) => toast.error(error.message),
})

export const useFindMilestones = createMutation({
    mutationKey: ['find-milestones'],
    mutationFn: () => projectsService.findMilestones(),
    onSuccess: (found) => {
        toast.success(found ? `Found ${pluralize(found, 'milestone')}` : 'No new milestones')
        refreshProjects()
    },
    onError: (error) => {
        toast.error(error.message)
        refreshProjects()
    },
})
