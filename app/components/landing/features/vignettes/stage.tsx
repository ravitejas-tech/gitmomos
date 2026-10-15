import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

export interface VignetteStageProps {
    glow?: boolean
    className?: string
    children: ReactNode
}

export function VignetteStage({ glow = false, className, children }: VignetteStageProps) {
    return (
        <div className='absolute inset-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]'>
            {glow && <div className='absolute inset-0 bg-hero-glow' />}
            <div className={cn('relative flex h-full flex-col px-6 pt-6', className)}>{children}</div>
        </div>
    )
}
