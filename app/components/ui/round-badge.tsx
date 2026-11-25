import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from '~/components/ui/text'

const roundBadgeVariants = cva('flex shrink-0 items-center justify-center rounded-full [&_svg]:size-3.5', {
    variants: {
        tone: {
            subtle: 'bg-accent-subtle text-accent-text',
            solid: 'bg-accent text-accent-foreground',
            success: 'bg-success-subtle text-success',
            muted: 'bg-surface-muted text-text-muted',
            plain: 'text-text-muted',
            gold: 'bg-medal-gold-subtle text-medal-gold ring-1 ring-medal-gold/50',
            silver: 'bg-medal-silver-subtle text-medal-silver ring-1 ring-medal-silver/50',
            bronze: 'bg-medal-bronze-subtle text-medal-bronze ring-1 ring-medal-bronze/50',
        },
        size: {
            sm: 'size-6',
            md: 'size-7',
        },
    },
    defaultVariants: { tone: 'subtle', size: 'md' },
})

export type RoundBadgeTone = NonNullable<VariantProps<typeof roundBadgeVariants>['tone']>

export interface RoundBadgeProps extends VariantProps<typeof roundBadgeVariants> {
    children: ReactNode
}

export function RoundBadge({ tone, size, children }: RoundBadgeProps) {
    return (
        <span className={roundBadgeVariants({ tone, size })}>
            <Text
                as='span'
                variant='caption-strong'
                tone='inherit'
                numeric>
                {children}
            </Text>
        </span>
    )
}
