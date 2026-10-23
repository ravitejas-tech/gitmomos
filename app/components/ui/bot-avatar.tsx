import { cva, type VariantProps } from 'class-variance-authority'
import { Momi } from '~/components/ui/momi'
import type { MomiMood } from '~/types/momi'

const botAvatarVariants = cva('flex shrink-0 items-center justify-center rounded-full bg-accent-subtle', {
    variants: {
        size: {
            md: 'size-9 [&_svg]:size-8',
            lg: 'size-11 [&_svg]:size-10',
        },
    },
    defaultVariants: { size: 'md' },
})

export interface BotAvatarProps extends VariantProps<typeof botAvatarVariants> {
    mood?: MomiMood | undefined
    animated?: boolean
}

export function BotAvatar({ mood, size, animated }: BotAvatarProps) {
    return (
        <span className={botAvatarVariants({ size })}>
            <Momi
                mood={mood}
                animated={animated}
                steam={false}
                shadow={false}
                className='translate-y-px'
            />
        </span>
    )
}
