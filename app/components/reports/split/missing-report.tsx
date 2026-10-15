import { CalendarX2 } from 'lucide-react'
import { SyncButton } from '~/components/reports/sync-button'
import { Card } from '~/components/ui/card'
import { EmptyState } from '~/components/ui/empty-state'
import { SYNC_MAX_DAYS_BACK } from '~/data/reports/constants'
import { daysAgo } from '~/lib/calendar'
import { formatDay } from '~/lib/format'

export function MissingReport({ date }: { date: string }) {
    const age = daysAgo(date)
    const canWrite = age >= 0 && age <= SYNC_MAX_DAYS_BACK

    return (
        <Card>
            <EmptyState
                icon={CalendarX2}
                tone='plain'
                title='No report for this day'
                description={
                    canWrite
                        ? `There’s no report for ${formatDay(date)} yet. You can write one from that day’s commits.`
                        : `There’s no report for ${formatDay(date)}.`
                }
                action={
                    canWrite && (
                        <SyncButton
                            date={date}
                            label='Write this report'
                            variant='primary'
                        />
                    )
                }
                className='py-20'
            />
        </Card>
    )
}
