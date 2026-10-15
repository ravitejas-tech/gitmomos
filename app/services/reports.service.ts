import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import { REPORT_HISTORY_LIMIT } from '~/data/reports/constants'
import { reportContentSchema, type ReportContent } from '~/schemas/report.schema'
import type { DayRange } from '~/types/activity'
import type { SyncResult } from '~/types/reports'

export const reportsService = {
    async getReports(date?: string) {
        let query = supabase
            .from('reports')
            .select('id, date, status, content, commit_count, error, edited_at, updated_at')
        if (date) query = query.eq('date', date)

        const { data, error } = await query.order('date', { ascending: false }).limit(REPORT_HISTORY_LIMIT)
        if (error) throw error
        return data.map((report) => ({
            ...report,
            content: report.content ? reportContentSchema.parse(report.content) : null,
        }))
    },

    async getReportDays({ from, to }: DayRange) {
        const { data, error } = await supabase.from('reports').select('date, status').gte('date', from).lte('date', to)
        if (error) throw error
        return data
    },

    async updateReport({ id, content }: { id: string; content: ReportContent }) {
        const { error } = await supabase
            .from('reports')
            .update({ content, edited_at: new Date().toISOString() })
            .eq('id', id)
        if (error) throw error
    },

    sync(date?: string) {
        return invokeFunction<SyncResult>('sync', date ? { date } : {})
    },
}
