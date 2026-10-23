import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { SharedReportContent } from '~/components/public-profile/report/content'
import { Button } from '~/components/ui/button'
import { Modal } from '~/components/ui/modal'
import { ModalBody } from '~/components/ui/modal-body'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Text } from '~/components/ui/text'
import { formatDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { PublicReport } from '~/types/public-profile'

export interface SourceReportModalProps {
    handle: string
    report: PublicReport
    onClose: () => void
}

export function SourceReportModal({ handle, report, onClose }: SourceReportModalProps) {
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
                <SharedReportContent report={report} />
            </ModalBody>
            <PanelFooter className='flex justify-end'>
                <Button
                    asChild
                    variant='secondary'
                    size='sm'>
                    <Link
                        to={reportPath(handle, report.date)}
                        target='_blank'
                        rel='noreferrer'>
                        Open full report
                        <ArrowUpRight />
                    </Link>
                </Button>
            </PanelFooter>
        </Modal>
    )
}
