import type { LiHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const listRowVariants = cva('flex gap-3 px-5 py-3 transition-colors hover:bg-surface-muted/50', {
    variants: {
        align: {
            center: 'items-center',
            start: 'items-start',
        },
    },
    defaultVariants: { align: 'center' },
})

export interface ListRowProps extends LiHTMLAttributes<HTMLLIElement>, VariantProps<typeof listRowVariants> {}

export function ListRow({ align, className, ...props }: ListRowProps) {
    return (
        <li
            className={cn(listRowVariants({ align }), className)}
            {...props}
        />
    )
}
