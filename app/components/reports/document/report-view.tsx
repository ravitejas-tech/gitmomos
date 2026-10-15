import { useState } from 'react'
import { ReportDocument } from '~/components/reports/document/report-document'
import { ReportToolbar } from '~/components/reports/document/toolbar'
import { EditReportModal } from '~/components/reports/edit/edit-report-modal'
import { Card } from '~/components/ui/card'
import type { Report } from '~/types/reports'

export function ReportView({ report }: { report: Report }) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='min-w-0 space-y-4'>
            <ReportToolbar
                report={report}
                onEdit={() => setIsEditing(true)}
            />
            <Card className='px-5 py-8 sm:px-10 sm:py-12 xl:px-14 print:border-0 print:p-0 print:shadow-none'>
                <div className='mx-auto max-w-3xl'>
                    <ReportDocument report={report} />
                </div>
            </Card>
            {report.content && isEditing && (
                <EditReportModal
                    reportId={report.id}
                    content={report.content}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    )
}
