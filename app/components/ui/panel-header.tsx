import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function PanelHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex items-center justify-between gap-3 border-b border-border px-5 py-3', className)}
            {...props}
        />
    )
}
