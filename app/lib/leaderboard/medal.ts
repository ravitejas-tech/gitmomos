import { MEDALS } from '~/data/leaderboard/constants'

export function medalFor(rank: number): (typeof MEDALS)[number] | null {
    return MEDALS[rank - 1] ?? null
}

export function shareOf(value: number, total: number): number {
    return total > 0 ? Math.max(2, Math.round((value / total) * 100)) : 0
}
