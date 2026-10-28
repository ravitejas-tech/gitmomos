import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import { MILESTONE_SCAN_ROUNDS } from '~/data/projects/constants'
import { projectsSchema, publicProjectSchema, publicProjectsSchema } from '~/schemas/project.schema'
import type { MilestoneScan, MilestoneVisibility, ProjectSave, PublicProjectQuery } from '~/types/projects'

export const projectsService = {
    async getProjects() {
        const { data, error } = await supabase.rpc('get_projects')
        if (error) throw error
        return projectsSchema.parse(data)
    },

    async getMilestones(repositoryIds: string[]) {
        const { data, error } = await supabase
            .from('milestones')
            .select('id, date, title, detail, hidden')
            .in('repository_id', repositoryIds)
            .order('date', { ascending: false })
        if (error) throw error
        return data
    },

    async saveProject({ id, name, description, url, repositoryIds, isPublic, tracksMilestones }: ProjectSave) {
        const { data, error } = await supabase.rpc('save_project', {
            p_name: name,
            p_is_public: isPublic,
            p_tracks_milestones: tracksMilestones,
            p_repository_ids: repositoryIds,
            p_description: description || undefined,
            p_url: url || undefined,
            p_id: id,
        })
        if (error) throw error
        return data
    },

    async deleteProject(id: string) {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) throw error
    },

    async setMilestoneHidden({ id, hidden }: MilestoneVisibility) {
        const { error } = await supabase.from('milestones').update({ hidden }).eq('id', id)
        if (error) throw error
    },

    async findMilestones(round = 1): Promise<number> {
        const { found, remaining } = await invokeFunction<MilestoneScan>('milestones', {})
        return remaining && round < MILESTONE_SCAN_ROUNDS
            ? found + (await projectsService.findMilestones(round + 1))
            : found
    },

    async getPublicProjects(handle: string) {
        const { data, error } = await supabase.rpc('get_public_projects', { p_handle: handle })
        if (error) throw error
        return publicProjectsSchema.parse(data ?? [])
    },

    async getPublicProject({ handle, slug }: PublicProjectQuery) {
        const { data, error } = await supabase.rpc('get_public_project', { p_handle: handle, p_slug: slug })
        if (error) throw error
        return data ? publicProjectSchema.parse(data) : null
    },
}
