import { supabase } from '~/services/supabase'
import { publicTimesheetSchema, timesheetSchema } from '~/schemas/timesheet.schema'
import type { DayRange } from '~/types/activity'
import type { PublicTimesheetQuery, TimesheetEntry } from '~/types/timesheet'

export const timesheetService = {
    async getTimesheet({ from, to }: DayRange) {
        const { data, error } = await supabase.rpc('get_timesheet', { p_from: from, p_to: to })
        if (error) throw error
        return timesheetSchema.parse(data)
    },

    async getPublicTimesheet({ handle, from, to }: PublicTimesheetQuery) {
        const { data, error } = await supabase.rpc('get_public_timesheet', { p_handle: handle, p_from: from, p_to: to })
        if (error) throw error
        return publicTimesheetSchema.parse(data ?? [])
    },

    async saveEntry({ date, minutes }: TimesheetEntry) {
        const { error } = await supabase.rpc('set_timesheet_entry', { p_date: date, p_minutes: minutes })
        if (error) throw error
    },

    async resetEntry(date: string) {
        const { error } = await supabase.rpc('set_timesheet_entry', { p_date: date })
        if (error) throw error
    },
}
