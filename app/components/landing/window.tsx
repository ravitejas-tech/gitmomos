import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function LandingWindow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('overflow-hidden rounded-xl border border-border-strong bg-bg shadow-overlay', className)}
            {...props}
        />
    )
}
