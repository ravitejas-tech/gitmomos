import type { ReactNode } from 'react'
import { LandingWindow } from '~/components/landing/window'
import { Dot } from '~/components/ui/dot'
import { Text } from '~/components/ui/text'

export interface ShowcaseWindowProps {
    title: string
    children: ReactNode
}

export function ShowcaseWindow({ title, children }: ShowcaseWindowProps) {
    return (
        <LandingWindow>
            <div className='flex items-center gap-4 border-b border-border bg-panel px-4 py-3'>
                <div className='flex gap-1.5'>
                    <Dot className='bg-border-strong' />
                    <Dot className='bg-border-strong' />
                    <Dot className='bg-border-strong' />
                </div>
                <Text
                    as='span'
                    variant='meta'>
                    gitmomos · {title}
                </Text>
            </div>
            <div
                aria-hidden
                inert
                className='p-4 select-none sm:p-6'>
                {children}
            </div>
        </LandingWindow>
    )
}
