import { supabase } from '../lib/supabase';

export const reportsService = {
    async getReports(date?: string) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Authentication required');

        let query = supabase
            .from('reports')
            .select('*, projects(name)')
            .eq('user_id', session.user.id);

        if (date) {
            query = query.eq('date', date);
        }

        const { data, error } = await query.order('date', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async getReportById(id: string) {
        const { data, error } = await supabase
            .from('reports')
            .select('*, projects(name)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async updateReport(id: string, updates: any) {
        const { data, error } = await supabase
            .from('reports')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};
