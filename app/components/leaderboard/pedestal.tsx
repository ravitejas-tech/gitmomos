import { cva } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { formatNumber } from '~/lib/format'
import type { MEDALS } from '~/data/leaderboard/constants'
import type { PodiumPlace } from '~/types/leaderboard'

const pedestalVariants = cva('mt-5 flex w-full justify-center rounded-t-xl border border-b-0 border-t-2 pt-3', {
    variants: {
        tone: {
            gold: 'border-medal-gold/30 border-t-medal-gold bg-medal-gold-subtle text-medal-gold',
            silver: 'border-medal-silver/30 border-t-medal-silver bg-medal-silver-subtle text-medal-silver',
            bronze: 'border-medal-bronze/30 border-t-medal-bronze bg-medal-bronze-subtle text-medal-bronze',
            vacant: 'border-dashed border-border-strong bg-surface-muted text-text-muted',
        },
        place: {
            1: 'h-36',
            2: 'h-28',
            3: 'h-20',
        },
    },
})

export interface PedestalProps {
    tone: (typeof MEDALS)[number] | 'vacant'
    place: PodiumPlace
    rank: number
}

export function Pedestal({ tone, place, rank }: PedestalProps) {
    return (
        <div className={pedestalVariants({ tone, place })}>
            <Text
                variant='display'
                tone='inherit'
                numeric>
                {formatNumber(rank)}
            </Text>
        </div>
    )
}
