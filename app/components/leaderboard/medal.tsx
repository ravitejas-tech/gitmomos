import { RoundBadge } from '~/components/ui/round-badge'
import { formatNumber } from '~/lib/format'
import { medalFor } from '~/lib/leaderboard/medal'

export function RankMedal({ rank }: { rank: number }) {
    return (
        <RoundBadge
            size='sm'
            tone={medalFor(rank) ?? 'plain'}>
            {formatNumber(rank)}
        </RoundBadge>
    )
}
