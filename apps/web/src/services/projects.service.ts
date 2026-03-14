import { supabase } from '../lib/supabase';

export const projectsService = {
    async getProjects() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Authentication required');

        const { data, error } = await supabase
            .from('projects')
            .select('*, sync_state(last_sync_at, last_synced_hash)')
            .eq('user_id', session.user.id);

        if (error) throw error;
        return data || [];
    },

    async getProjectById(id: string) {
        const { data, error } = await supabase
            .from('projects')
            .select('*, sync_state(last_sync_at, last_synced_hash)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getProjectCommits(projectId: string, page: number = 0, limit: number = 20) {
        const { data, error } = await supabase
            .from('commits_metadata')
            .select('*')
            .eq('project_id', projectId)
            .order('author_timestamp', { ascending: false })
            .range(page * limit, (page + 1) * limit - 1);

        if (error) throw error;
        return data || [];
    },
};
