import { CalendarDays } from 'lucide-react'
import { SharedReportContent } from '~/components/public-profile/report/content'
import { SharedFooter } from '~/components/public-profile/report/shared-footer'
import { ReportDocumentHeader } from '~/components/reports/document/header'
import { MetaItem } from '~/components/ui/meta-item'
import { formatDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { SharedReport } from '~/types/public-profile'

export function SharedReportDocument({ report }: { report: SharedReport }) {
    return (
        <article className='space-y-10'>
            <ReportDocumentHeader
                headline={report.headline || formatDay(report.date)}
                author={report.name}>
                <MetaItem icon={CalendarDays}>{formatDay(report.date)}</MetaItem>
            </ReportDocumentHeader>
            <SharedReportContent report={report} />
            <SharedFooter path={reportPath(report.handle, report.date)} />
        </article>
    )
}
