import { supabase } from '../lib/supabase';

export const analyticsService = {
    async getStats() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Authentication required');

        const { count: projectsCount } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        const { count: commitsCount } = await supabase
            .from('commits_metadata')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        const { count: reportsCount } = await supabase
            .from('reports')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        return {
            projectsCount: projectsCount || 0,
            commitsCount: commitsCount || 0,
            reportsCount: reportsCount || 0,
            streak: 0, // Placeholder for streak logic if needed, or simple count
        };
    },

    async getActivityHistory() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Authentication required');

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const { data, error } = await supabase
            .from('commits_metadata')
            .select('author_timestamp')
            .eq('user_id', session.user.id)
            .gte('author_timestamp', sevenDaysAgo.toISOString());

        if (error) throw error;

        // Group by day
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const historyMap: Record<string, number> = {};
        
        // Initialize last 7 days
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dayName = days[d.getDay()];
            historyMap[dayName] = 0;
        }

        data?.forEach((commit) => {
            const date = new Date(commit.author_timestamp);
            const dayName = days[date.getDay()];
            if (historyMap[dayName] !== undefined) {
                historyMap[dayName]++;
            }
        });

        // Convert to array of { name, commits } in correct order (past to present)
        return Object.entries(historyMap)
            .map(([name, commits]) => ({ name, commits }))
            .reverse();
    },
};
