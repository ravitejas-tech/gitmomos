import { useEffect, useRef } from 'react'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { formatShortDay } from '~/lib/format'
import { reportMeta } from '~/lib/reports/meta'
import { reportBadge } from '~/lib/reports/status'
import { cn } from '~/lib/utils'
import type { Report } from '~/types/reports'

export interface ReportDayRowProps {
    report: Report
    selected: boolean
    onSelect: () => void
}

export function ReportDayRow({ report, selected, onSelect }: ReportDayRowProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const badge = reportBadge(report)

    useEffect(() => {
        if (selected) ref.current?.scrollIntoView({ block: 'nearest' })
    }, [selected])

    return (
        <li>
            <button
                ref={ref}
                type='button'
                onClick={onSelect}
                aria-current={selected}
                className={cn(
                    'relative block w-full cursor-pointer space-y-1 px-5 py-4 text-left transition-colors',
                    selected ? 'bg-accent-subtle/60' : 'hover:bg-surface-muted/60',
                )}>
                {selected && <span className='absolute inset-y-3 left-0 w-1 rounded-r-full bg-accent' />}
                <span className='flex items-center gap-2'>
                    <Text
                        as='span'
                        variant='caption-strong'
                        tone={selected ? 'accent' : 'muted'}>
                        {formatShortDay(report.date)}
                    </Text>
                    {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
                </span>
                <Text
                    as='span'
                    variant='strong'
                    className='line-clamp-2'>
                    {report.content?.headline || report.content?.summary || 'Report could not be written'}
                </Text>
                <Text
                    as='span'
                    variant='caption'
                    className='block'>
                    {reportMeta(report)}
                </Text>
            </button>
        </li>
    )
}
