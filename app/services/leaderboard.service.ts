import { profileMediaService } from '~/services/profile-media.service'
import { supabase } from '~/services/supabase'
import { LEADERBOARD_PAGE_SIZE } from '~/data/leaderboard/constants'
import { leaderboardSchema } from '~/schemas/leaderboard.schema'

export const leaderboardService = {
    async getLeaderboard(offset: number) {
        const { data, error } = await supabase.rpc('get_leaderboard', {
            p_limit: LEADERBOARD_PAGE_SIZE,
            p_offset: offset,
        })
        if (error) throw error
        const board = leaderboardSchema.parse(data)
        return { ...board, people: board.people.map(profileMediaService.withAvatarUrl) }
    },
}
