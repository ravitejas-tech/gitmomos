import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function PanelFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('border-t border-border bg-surface-muted px-5 py-3', className)}
            {...props}
        />
    )
}
