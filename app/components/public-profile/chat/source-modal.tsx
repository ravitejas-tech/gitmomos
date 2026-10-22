import { ReportHighlights } from '~/components/reports/document/highlights'
import { ReportSection } from '~/components/reports/document/section'
import { ReportSummary } from '~/components/reports/document/summary'
import { Modal } from '~/components/ui/modal'
import { ModalBody } from '~/components/ui/modal-body'
import { Text } from '~/components/ui/text'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import { formatDay } from '~/lib/format'
import type { PublicReport } from '~/types/public-profile'

export interface SourceReportModalProps {
    report: PublicReport
    onClose: () => void
}

export function SourceReportModal({ report, onClose }: SourceReportModalProps) {
    return (
        <Modal
            title={formatDay(report.date)}
            onClose={onClose}>
            <ModalBody>
                <Text
                    as='h3'
                    variant='heading'>
                    {report.headline}
                </Text>
                <ReportSummary
                    summary={report.summary}
                    areas={report.key_work_areas}
                />
                {report.highlights.length > 0 && (
                    <ReportSection title={REPORT_SECTIONS.highlights}>
                        <ReportHighlights highlights={report.highlights} />
                    </ReportSection>
                )}
            </ModalBody>
        </Modal>
    )
}
