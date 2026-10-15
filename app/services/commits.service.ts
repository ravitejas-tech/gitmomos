import { supabase } from '~/services/supabase'
import { DAY_COMMITS_LIMIT, RECENT_COMMITS_LIMIT } from '~/data/commits/constants'
import { localDayRange } from '~/lib/format'

const COMMIT_COLUMNS = 'id, sha, message, kind, committed_at, html_url, repositories!inner(full_name)'

export const commitsService = {
    async getDayCommits(date: string) {
        const { start, end } = localDayRange(date)
        const { data, error } = await supabase
            .from('commits')
            .select(COMMIT_COLUMNS)
            .gte('committed_at', start.toISOString())
            .lt('committed_at', end.toISOString())
            .order('committed_at', { ascending: false })
            .limit(DAY_COMMITS_LIMIT)
        if (error) throw error
        return data
    },

    async getRecentCommits() {
        const { data, error } = await supabase
            .from('commits')
            .select(COMMIT_COLUMNS)
            .order('committed_at', { ascending: false })
            .limit(RECENT_COMMITS_LIMIT)
        if (error) throw error
        return data
    },
}
