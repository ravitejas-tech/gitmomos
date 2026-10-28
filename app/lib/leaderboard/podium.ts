import { pluralize } from '~/lib/format'
import type { LeaderboardEntry } from '~/types/leaderboard'

export function podiumGap(leaders: LeaderboardEntry[], index: number): string | null {
    const [leader, runnerUp] = leaders
    const entry = leaders[index]
    if (!leader || !entry) return null

    if (index === 0) {
        const lead = runnerUp ? leader.commits - runnerUp.commits : 0
        return lead > 0 ? `Leading by ${pluralize(lead, 'commit')}` : null
    }

    const gap = leader.commits - entry.commits
    return gap > 0 ? `${pluralize(gap, 'commit')} behind #1` : null
}
