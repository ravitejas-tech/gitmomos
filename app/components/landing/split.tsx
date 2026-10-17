import type { ReactNode } from 'react'

export interface LandingSplitProps {
    aside: ReactNode
    children: ReactNode
}

export function LandingSplit({ aside, children }: LandingSplitProps) {
    return (
        <div className='grid gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16 lg:gap-24'>
            <div className='md:sticky md:top-24 md:self-start'>{aside}</div>
            {children}
        </div>
    )
}
