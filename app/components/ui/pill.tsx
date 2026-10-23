import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

export interface PillProps {
    className?: string
    children: ReactNode
}

export function Pill({ className, children }: PillProps) {
    return (
        <span
            className={cn(
                'inline-flex h-7 shrink-0 items-center gap-2 rounded-full border border-border-strong bg-surface px-3 shadow-edge',
                className,
            )}>
            {children}
        </span>
    )
}
