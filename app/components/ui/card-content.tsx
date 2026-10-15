import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('px-5 pb-5', className)}
            {...props}
        />
    )
}
