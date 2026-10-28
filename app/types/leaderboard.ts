import type { PODIUM_ORDER } from '~/data/leaderboard/constants'
import type { leaderboardService } from '~/services/leaderboard.service'

export type LeaderboardPage = Awaited<ReturnType<typeof leaderboardService.getLeaderboard>>
export type LeaderboardEntry = LeaderboardPage['people'][number]
export type PodiumPlace = (typeof PODIUM_ORDER)[number]
