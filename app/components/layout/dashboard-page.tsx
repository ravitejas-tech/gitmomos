import type { ReactNode } from 'react'
import { PageHeader, type PageHeaderProps } from '~/components/ui/page-header'
import { cn } from '~/lib/utils'

export interface DashboardPageProps extends PageHeaderProps {
    width?: 'narrow' | 'default'
    children: ReactNode
}

export function DashboardPage({ width = 'default', children, ...header }: DashboardPageProps) {
    return (
        <div className={cn('w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-8 print:p-0', width === 'narrow' && 'max-w-6xl')}>
            <PageHeader {...header} />
            {children}
        </div>
    )
}
