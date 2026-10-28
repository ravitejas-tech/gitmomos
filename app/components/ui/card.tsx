import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const cardVariants = cva('relative overflow-hidden rounded-xl border text-text-primary', {
    variants: {
        tone: {
            default: 'border-border bg-surface shadow-card',
            subtle: 'border-border bg-surface-muted',
            interactive: 'border-border bg-surface shadow-card transition-colors hover:border-border-strong',
            highlight: 'border-accent/30 bg-surface shadow-card',
            overlay: 'border-border bg-surface shadow-overlay',
        },
        padding: {
            none: '',
            md: 'p-4',
            lg: 'p-5 sm:p-6',
        },
    },
    defaultVariants: { tone: 'default', padding: 'none' },
})

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, tone, padding, ...props }: CardProps) {
    return (
        <div
            className={cn(cardVariants({ tone, padding }), className)}
            {...props}
        />
    )
}
