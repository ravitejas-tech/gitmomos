import { TriangleAlert } from 'lucide-react'
import { SyncButton } from '~/components/reports/sync-button'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'
import type { Report } from '~/types/reports'

export function ReportFailure({ report }: { report: Report }) {
    return (
        <div className='flex flex-col gap-4 rounded-xl border border-danger/20 bg-danger-subtle p-5 sm:flex-row sm:items-start'>
            <IconChip
                icon={TriangleAlert}
                tone='danger'
            />
            <div className='min-w-0 flex-1 space-y-1'>
                <Text variant='title'>This report couldn’t be written</Text>
                <Text tone='secondary'>Your commits for this day are safe. Try writing the report again.</Text>
                {report.error && (
                    <Text
                        variant='meta'
                        className='pt-1 break-words'>
                        {report.error}
                    </Text>
                )}
            </div>
            <SyncButton
                date={report.date}
                label='Try again'
                size='sm'
            />
        </div>
    )
}
