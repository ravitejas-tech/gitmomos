import { NavLink } from 'react-router'
import { ArrowRight, FileText } from 'lucide-react'
import { LatestHighlights } from '~/components/overview/latest-highlights'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { EmptyState } from '~/components/ui/empty-state'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { REPORTS_PATH } from '~/data/navigation'
import { formatDay } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { Report } from '~/types/reports'

export interface LatestReportCardProps {
    report: Report | undefined
    isLoading: boolean
    className?: string
}

export function LatestReportCard({ report, isLoading, className }: LatestReportCardProps) {
    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader
                title='Latest report'
                description={report ? formatDay(report.date) : undefined}
                actions={
                    report && (
                        <Button
                            asChild
                            variant='secondary'
                            size='sm'>
                            <NavLink to={`${REPORTS_PATH}?date=${report.date}`}>
                                Open report
                                <ArrowRight />
                            </NavLink>
                        </Button>
                    )
                }
            />
            <CardContent className='flex-1'>
                {isLoading && <Skeleton className='h-48' />}
                {!isLoading && !report?.content && (
                    <EmptyState
                        icon={FileText}
                        title='No reports yet'
                        className='h-full py-10'
                    />
                )}
                {report?.content && (
                    <div className='space-y-4'>
                        <Text
                            as='h3'
                            variant='heading'>
                            {report.content.headline || formatDay(report.date)}
                        </Text>
                        <Text
                            tone='secondary'
                            className='line-clamp-3 leading-6'>
                            {report.content.summary}
                        </Text>
                        <LatestHighlights highlights={report.content.highlights} />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
