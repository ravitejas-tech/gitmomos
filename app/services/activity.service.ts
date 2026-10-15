import { supabase } from '~/services/supabase'
import { activitySchema } from '~/schemas/activity.schema'
import type { DayRange } from '~/types/activity'

export const activityService = {
    async getActivity({ from, to }: DayRange) {
        const { data, error } = await supabase.rpc('get_activity', { p_from: from, p_to: to })
        if (error) throw error
        return activitySchema.parse(data)
    },
}
