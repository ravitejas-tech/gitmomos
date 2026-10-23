import { useSearchParams } from 'react-router'
import { CalendarX2 } from 'lucide-react'
import { DigestDocument } from '~/components/public-profile/digest/document'
import { ShareToolbar } from '~/components/public-profile/report/toolbar'
import { Container } from '~/components/ui/container'
import { DocumentCard } from '~/components/ui/document-card'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { useReportDigest } from '~/hooks/public-profile/queries'
import { usePrintRequest } from '~/hooks/public-profile/use-print-request'
import { digestFilter, digestPath } from '~/lib/public-profile/handle'
import { digestPdfTitle } from '~/lib/public-profile/report'

export function DigestView({ handle }: { handle: string }) {
    const [params] = useSearchParams()
    const filter = digestFilter(params)
    const { data: digest, isPending, isError, refetch } = useReportDigest({ variables: { handle, ...filter } })
    const ready = Boolean(digest?.reports.length)
    usePrintRequest(digest && ready ? digestPdfTitle(digest.name, filter) : null)

    return (
        <Container
            size='document'
            className='space-y-6 py-8 lg:py-12 print:p-0'>
            {isPending && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {digest && (
                <ShareToolbar
                    handle={handle}
                    name={digest.name}
                    path={digestPath(handle, filter)}
                    pdfTitle={digestPdfTitle(digest.name, filter)}
                />
            )}
            {(digest === null || (digest && !ready)) && (
                <EmptyState
                    icon={CalendarX2}
                    title='No shared reports here'
                    description='There are no shared reports for this period or search.'
                />
            )}
            {digest && ready && (
                <DocumentCard>
                    <DigestDocument
                        handle={handle}
                        filter={filter}
                        digest={digest}
                    />
                </DocumentCard>
            )}
        </Container>
    )
}
