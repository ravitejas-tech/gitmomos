import { ReportContentView } from '~/components/reports/document/content-view'
import { ReportFailure } from '~/components/reports/document/failure'
import { ReportDocumentHeader } from '~/components/reports/document/header'
import { ReportTechnicalDetails } from '~/components/reports/document/technical-details'
import type { Report } from '~/types/reports'

export function ReportDocument({ report }: { report: Report }) {
    return (
        <article className='space-y-10'>
            <ReportDocumentHeader report={report} />
            {report.status === 'failed' && <ReportFailure report={report} />}
            {report.content && (
                <ReportContentView
                    date={report.date}
                    content={report.content}
                />
            )}
            <ReportTechnicalDetails date={report.date} />
        </article>
    )
}
