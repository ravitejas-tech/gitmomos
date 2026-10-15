import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const badgeVariants = cva('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold', {
    variants: {
        variant: {
            outline: 'border-border bg-surface text-text-secondary',
            neutral: 'border-transparent bg-surface-muted text-text-secondary',
            accent: 'border-transparent bg-accent-subtle text-accent-text',
            danger: 'border-transparent bg-danger-subtle text-danger',
            success: 'border-transparent bg-success-subtle text-success',
        },
    },
    defaultVariants: { variant: 'outline' },
})

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    )
}
