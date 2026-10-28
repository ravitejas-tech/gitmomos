import { cva } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { formatNumber } from '~/lib/format'
import { medalFor } from '~/lib/leaderboard/medal'

const medalVariants = cva('inline-flex size-6 shrink-0 items-center justify-center rounded-full', {
    variants: {
        medal: {
            gold: 'bg-medal-gold-subtle text-medal-gold ring-1 ring-medal-gold/50',
            silver: 'bg-medal-silver-subtle text-medal-silver ring-1 ring-medal-silver/50',
            bronze: 'bg-medal-bronze-subtle text-medal-bronze ring-1 ring-medal-bronze/50',
            none: 'text-text-muted',
        },
    },
    defaultVariants: { medal: 'none' },
})

export function RankMedal({ rank }: { rank: number }) {
    return (
        <span className={medalVariants({ medal: medalFor(rank) ?? 'none' })}>
            <Text
                as='span'
                variant='caption-strong'
                tone='inherit'
                numeric>
                {formatNumber(rank)}
            </Text>
        </span>
    )
}
