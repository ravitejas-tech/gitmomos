import { Link } from 'react-router'
import { FileX2 } from 'lucide-react'
import { SharedReportDocument } from '~/components/public-profile/report/document'
import { SharedReportPager } from '~/components/public-profile/report/pager'
import { ShareToolbar } from '~/components/public-profile/report/toolbar'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { DocumentCard } from '~/components/ui/document-card'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { useSharedReport } from '~/hooks/public-profile/queries'
import { usePrintRequest } from '~/hooks/public-profile/use-print-request'
import { profilePath, reportPath } from '~/lib/public-profile/handle'
import { reportPdfTitle } from '~/lib/public-profile/report'
import type { SharedReportQuery } from '~/types/public-profile'

export function SharedReportView({ handle, date }: SharedReportQuery) {
    const { data: report, isPending, isError, refetch } = useSharedReport({ variables: { handle, date } })
    usePrintRequest(report ? reportPdfTitle(report) : null)

    return (
        <Container
            size='document'
            className='space-y-6 py-8 lg:py-12 print:p-0'>
            {isPending && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {report === null && (
                <EmptyState
                    icon={FileX2}
                    title='This report isn’t shared'
                    description='It may have been made private, or the link is wrong.'
                    action={
                        <Button
                            asChild
                            variant='secondary'>
                            <Link to={profilePath(handle)}>Back to the profile</Link>
                        </Button>
                    }
                />
            )}
            {report && (
                <>
                    <ShareToolbar
                        handle={report.handle}
                        name={report.name}
                        path={reportPath(report.handle, report.date)}
                        pdfTitle={reportPdfTitle(report)}
                    />
                    <DocumentCard>
                        <SharedReportDocument report={report} />
                    </DocumentCard>
                    <SharedReportPager report={report} />
                </>
            )}
        </Container>
    )
}
