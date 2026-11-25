import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface PageHeaderProps {
    title: string
    description?: ReactNode
    actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
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
    )
}
