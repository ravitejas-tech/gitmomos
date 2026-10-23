import { PdfLinkButton } from '~/components/public-profile/reports/pdf-link-button'
import { SharedReportRow } from '~/components/public-profile/reports/row'
import { Text } from '~/components/ui/text'
import { formatDayRange, pluralize } from '~/lib/format'
import { digestPath } from '~/lib/public-profile/handle'
import { weekLabel } from '~/lib/public-profile/periods'
import type { ReportWeek as Week } from '~/types/public-profile'

export interface ReportWeekProps {
    handle: string
    query: string
    week: Week
}

export function ReportWeek({ handle, query, week }: ReportWeekProps) {
    return (
        <section>
            <div className='flex items-center justify-between gap-3 border-t border-border bg-surface-muted px-5 py-2'>
                <Text
                    as='h3'
                    variant='caption-strong'
                    tone='secondary'>
                    {weekLabel(week)} · {formatDayRange(week.from, week.to)} ·{' '}
                    {pluralize(week.reports.length, 'report')}
                </Text>
                <PdfLinkButton
                    to={digestPath(handle, { query, from: week.from, to: week.to }, true)}
                    label={`Download ${weekLabel(week).toLowerCase()} as a PDF`}
                    variant='ghost'
                    compact
                />
            </div>
            <ul className='divide-y divide-border border-t border-border'>
                {week.reports.map((report) => (
                    <SharedReportRow
                        key={report.date}
                        handle={handle}
                        report={report}
                    />
                ))}
            </ul>
        </section>
    )
}
