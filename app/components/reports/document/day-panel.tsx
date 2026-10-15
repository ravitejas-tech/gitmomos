import { CommitList } from '~/components/commits/commit-list'
import { GlanceRow } from '~/components/reports/document/glance-row'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import { useDayCommits } from '~/hooks/commits/queries'
import { formatTime, pluralize } from '~/lib/format'
import { reportStatusLabel } from '~/lib/reports/status'
import { cn } from '~/lib/utils'
import type { Report } from '~/types/reports'

export function ReportDayPanel({ report, className }: { report: Report; className?: string }) {
    const { data: commits, isLoading } = useDayCommits({ variables: report.date })
    const first = commits?.at(-1)
    const last = commits?.[0]

    return (
        <aside className={cn('space-y-4', className)}>
            <Card>
                <CardHeader title='At a glance' />
                <CardContent className='space-y-3'>
                    <GlanceRow label='Status'>{reportStatusLabel(report)}</GlanceRow>
                    <GlanceRow label='Commits'>{report.commit_count}</GlanceRow>
                    <GlanceRow label='Projects'>{report.content?.repositories.length ?? 0}</GlanceRow>
                    {first && last && (
                        <GlanceRow label='Time span'>
                            {formatTime(first.committed_at)} – {formatTime(last.committed_at)}
                        </GlanceRow>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader
                    title={REPORT_SECTIONS.commits}
                    description={commits ? pluralize(commits.length, 'commit') : undefined}
                />
                <div className='border-t border-border'>
                    <CommitList
                        commits={commits}
                        isLoading={isLoading}
                        emptyLabel='No commits recorded for this day.'
                    />
                </div>
            </Card>
        </aside>
    )
}
