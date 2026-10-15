import { EditReportForm } from '~/components/reports/edit/edit-report-form'
import { Modal } from '~/components/ui/modal'
import type { ReportContent } from '~/schemas/report.schema'

export interface EditReportModalProps {
    reportId: string
    content: ReportContent
    onClose: () => void
}

export function EditReportModal({ reportId, content, onClose }: EditReportModalProps) {
    return (
        <Modal
            title='Edit report'
            onClose={onClose}>
            <EditReportForm
                reportId={reportId}
                content={content}
                onDone={onClose}
            />
        </Modal>
    )
}
