import type { LiHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const listRowVariants = cva('flex gap-3 px-5 py-3 transition-colors hover:bg-surface-muted/50', {
    variants: {
        align: {
            center: 'items-center',
            start: 'items-start',
        },
        tone: {
            default: '',
            highlight: 'bg-accent-subtle hover:bg-accent-subtle',
        },
    },
    defaultVariants: { align: 'center', tone: 'default' },
})

export interface ListRowProps extends LiHTMLAttributes<HTMLLIElement>, VariantProps<typeof listRowVariants> {}

export function ListRow({ align, tone, className, ...props }: ListRowProps) {
    return (
        <li
            className={cn(listRowVariants({ align, tone }), className)}
            {...props}
        />
    )
}
