import { Link } from 'react-router'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { REPORT_PAGER } from '~/data/public-profile/constants'
import { formatDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import { cn } from '~/lib/utils'
import type { SharedReport } from '~/types/public-profile'

export function SharedReportPager({ report }: { report: SharedReport }) {
    return (
        <nav
            aria-label='More reports'
            className='grid gap-3 sm:grid-cols-2 print:hidden'>
            {REPORT_PAGER.map(({ key, label, icon: Icon, align }) => {
                const date = report[key]
                if (!date) return <span key={key} />
                return (
                    <Card
                        key={key}
                        tone='interactive'
                        padding='md'
                        className={cn('flex items-center gap-3', align === 'end' && 'flex-row-reverse text-right')}>
                        <Icon className='size-4 shrink-0 text-text-muted' />
                        <div className='min-w-0 space-y-0.5'>
                            <Text variant='caption'>{label}</Text>
                            <Link
                                to={reportPath(report.handle, date)}
                                className='after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/50'>
                                <Text
                                    as='span'
                                    variant='title'>
                                    {formatDay(date)}
                                </Text>
                            </Link>
                        </div>
                    </Card>
                )
            })}
        </nav>
    )
}
