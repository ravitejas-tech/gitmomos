import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface OverviewSectionProps {
    title: string
    action?: ReactNode
    children: ReactNode
}

export function OverviewSection({ title, action, children }: OverviewSectionProps) {
    return (
        <section className='space-y-5'>
            <div className='flex min-h-8 items-center justify-between gap-3 border-b border-border pb-3'>
                <Text
                    as='h2'
                    variant='label'>
                    {title}
                </Text>
                {action}
            </div>
            {children}
        </section>
    )
}
