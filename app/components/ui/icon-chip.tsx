import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const iconChipVariants = cva('flex shrink-0 items-center justify-center border', {
    variants: {
        tone: {
            neutral: 'border-border bg-surface-muted text-text-secondary',
            accent: 'border-transparent bg-accent-subtle text-accent-text',
            danger: 'border-transparent bg-danger-subtle text-danger',
        },
        size: {
            sm: 'size-8 rounded-md [&_svg]:size-4',
            md: 'size-10 rounded-lg [&_svg]:size-5',
            lg: 'size-12 rounded-xl [&_svg]:size-6',
        },
    },
    defaultVariants: { tone: 'neutral', size: 'sm' },
})

export interface IconChipProps extends VariantProps<typeof iconChipVariants> {
    icon: LucideIcon
    className?: string
}

export function IconChip({ icon: Icon, tone, size, className }: IconChipProps) {
    return (
        <div className={cn(iconChipVariants({ tone, size }), className)}>
            <Icon />
        </div>
    )
}
