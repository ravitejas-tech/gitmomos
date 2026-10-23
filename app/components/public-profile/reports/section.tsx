import { keepPreviousData } from '@tanstack/react-query'
import { FileText, SearchX } from 'lucide-react'
import { PdfLinkButton } from '~/components/public-profile/reports/pdf-link-button'
import { ReportFilters } from '~/components/public-profile/reports/filters'
import { ReportWeek } from '~/components/public-profile/reports/week'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Skeleton } from '~/components/ui/skeleton'
import { Spinner } from '~/components/ui/spinner'
import { LOADING_ROWS, REPORTS_ID } from '~/data/public-profile/constants'
import { useSharedReports } from '~/hooks/public-profile/queries'
import { useReportFilters } from '~/hooks/public-profile/use-report-filters'
import { pluralize } from '~/lib/format'
import { digestPath } from '~/lib/public-profile/handle'
import { groupByWeek } from '~/lib/public-profile/periods'
import { digestTitle } from '~/lib/public-profile/report'

export function SharedReportsSection({ handle }: { handle: string }) {
    const { query, period, filter, setQuery, setPeriod, clear } = useReportFilters()
    const { data, isPending, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useSharedReports({
        variables: { handle, ...filter },
        placeholderData: keepPreviousData,
    })
    const reports = data?.pages.flatMap((page) => page?.reports ?? []) ?? []
    const total = data?.pages[0]?.total ?? 0
    const filtered = Boolean(filter.query || filter.from)

    return (
        <Card
            id={REPORTS_ID}
            className='scroll-mt-20'>
            <CardHeader
                title='Daily reports'
                description={
                    filtered ? `${pluralize(total, 'report')} · ${digestTitle(filter)}` : pluralize(total, 'report')
                }
                actions={
                    filtered &&
                    total > 0 && (
                        <PdfLinkButton
                            to={digestPath(handle, filter, true)}
                            label={total === 1 ? 'Download PDF' : `Download all ${total}`}
                        />
                    )
                }
            />
            <ReportFilters
                query={query}
                period={period}
                onQueryChange={setQuery}
                onPeriodChange={setPeriod}
            />
            {isPending && (
                <div className='space-y-3 border-t border-border p-5'>
                    {LOADING_ROWS.map((row) => (
                        <Skeleton
                            key={row}
                            className='h-20'
                        />
                    ))}
                </div>
            )}
            {isError && (
                <div className='border-t border-border p-5'>
                    <ErrorState onRetry={() => refetch()} />
                </div>
            )}
            {data && reports.length === 0 && (
                <div className='border-t border-border'>
                    <EmptyState
                        tone='plain'
                        icon={filtered ? SearchX : FileText}
                        title={filtered ? 'No reports match' : 'No shared reports yet'}
                        description={filtered ? 'Try another word, or a longer period.' : undefined}
                        action={
                            filtered && (
                                <Button
                                    variant='secondary'
                                    onClick={clear}>
                                    Show all reports
                                </Button>
                            )
                        }
                    />
                </div>
            )}
            {groupByWeek(reports).map((week) => (
                <ReportWeek
                    key={week.from}
                    handle={handle}
                    query={filter.query}
                    week={week}
                />
            ))}
            {hasNextPage && (
                <PanelFooter className='flex justify-center'>
                    <Button
                        variant='secondary'
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}>
                        {isFetchingNextPage && <Spinner />}
                        Show more reports
                    </Button>
                </PanelFooter>
            )}
        </Card>
    )
}
