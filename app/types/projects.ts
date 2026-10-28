import type { z } from 'zod'
import type {
    ProjectFormData,
    projectsSchema,
    publicProjectSchema,
    publicProjectsSchema,
} from '~/schemas/project.schema'
import type { projectsService } from '~/services/projects.service'
import type { Tables } from '~/types/database'

export type Project = z.infer<typeof projectsSchema>[number]
export type Milestone = Awaited<ReturnType<typeof projectsService.getMilestones>>[number]
export type PublicProjectSummary = z.infer<typeof publicProjectsSchema>[number]
export type PublicProject = z.infer<typeof publicProjectSchema>
export type PublicMilestone = PublicProject['milestones'][number]
export type ProjectSave = ProjectFormData & { id?: string | undefined }
export type MilestoneVisibility = Pick<Tables<'milestones'>, 'id' | 'hidden'>

export interface PublicProjectQuery {
    handle: string
    slug: string
}

export interface MilestoneScan {
    scanned: number
    found: number
    remaining: boolean
}
