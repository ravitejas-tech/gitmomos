import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

export interface TimesheetCellProps {
    as?: 'th' | 'td'
    first?: boolean
    children: ReactNode
}

export function TimesheetCell({ as: Tag = 'td', first, children }: TimesheetCellProps) {
    return <Tag className={cn('px-4 py-3 whitespace-nowrap', first ? 'pl-5 text-left' : 'text-right')}>{children}</Tag>
}
