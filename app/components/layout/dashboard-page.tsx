import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface DashboardPageProps {
    title: string
    description?: ReactNode
    actions?: ReactNode
    width?: 'narrow' | 'default'
    children: ReactNode
}

export function DashboardPage({ title, description, actions, width = 'default', children }: DashboardPageProps) {
    return (
        <div className={cn('w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-8 print:p-0', width === 'narrow' && 'max-w-6xl')}>
            <header className='mb-6 flex flex-wrap items-end justify-between gap-4 lg:mb-8 print:hidden'>
                <div className='min-w-0 space-y-1'>
                    <Text
                        as='h1'
                        variant='page-title'>
                        {title}
                    </Text>
                    {description && (
                        <Text
                            as='div'
                            tone='secondary'>
                            {description}
                        </Text>
                    )}
                </div>
                {actions && <div className='flex flex-wrap items-center gap-2'>{actions}</div>}
            </header>
            {children}
        </div>
    )
}
