import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function ModalBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('max-h-[70vh] space-y-6 overflow-y-auto p-5', className)}
            {...props}
        />
    )
}
