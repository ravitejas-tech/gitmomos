import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text, type TextVariant } from '~/components/ui/text'

const bulletVariants = cva('mt-[0.6em] size-1.5 shrink-0 rounded-full', {
    variants: {
        tone: {
            accent: 'bg-accent',
            neutral: 'bg-border-strong',
            success: 'bg-success',
            danger: 'bg-danger',
            none: 'invisible',
        },
    },
    defaultVariants: { tone: 'neutral' },
})

export interface BulletItemProps extends VariantProps<typeof bulletVariants> {
    children: ReactNode
    variant?: TextVariant
}

export function BulletItem({ tone, variant = 'article', children }: BulletItemProps) {
    return (
        <li className='flex items-start gap-3'>
            <span className={bulletVariants({ tone })} />
            <Text
                as='div'
                variant={variant}
                tone='secondary'
                className='min-w-0 flex-1'>
                {children}
            </Text>
        </li>
    )
}
