import { useState } from 'react'
import { ReportDocument } from '~/components/reports/document/report-document'
import { ReportToolbar } from '~/components/reports/document/toolbar'
import { EditReportModal } from '~/components/reports/edit/edit-report-modal'
import { DocumentCard } from '~/components/ui/document-card'
import type { Report } from '~/types/reports'

export function ReportView({ report }: { report: Report }) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='min-w-0 space-y-4'>
            <ReportToolbar
                report={report}
                onEdit={() => setIsEditing(true)}
            />
            <DocumentCard>
                <ReportDocument report={report} />
            </DocumentCard>
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
