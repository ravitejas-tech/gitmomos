import { ConsistencyCard } from '~/components/activity/consistency-card'
import { ActivityCard } from '~/components/overview/activity-card'
import { HoursCard } from '~/components/overview/hours-card'
import { LatestReportCard } from '~/components/overview/latest-report-card'
import { ProjectsCard } from '~/components/overview/projects-card'
import { RecentCommitsCard } from '~/components/overview/recent-commits-card'
import { StatGrid } from '~/components/overview/stat-grid'
import { WorkMixCard } from '~/components/overview/work-mix-card'
import { ErrorState } from '~/components/ui/error-state'
import { useActivity } from '~/hooks/activity/queries'
import { useReports } from '~/hooks/reports/queries'
import { lastDays } from '~/lib/activity/range'

export function Overview({ days }: { days: number }) {
    const range = lastDays(days)
    const { data: activity, isError, refetch } = useActivity({ variables: range })
    const { data: reports, isLoading: reportsLoading } = useReports({ variables: undefined })
    const written = reports?.filter((report) => report.status === 'generated')

    if (isError) return <ErrorState onRetry={() => refetch()} />

    return (
        <div className='space-y-6'>
            <StatGrid
                activity={activity}
                days={days}
                reports={written?.filter((report) => report.date >= range.from).length}
            />
            <div className='grid gap-6 xl:grid-cols-3'>
                <ActivityCard
                    daily={activity?.daily}
                    className='xl:col-span-2'
                />
                <WorkMixCard kinds={activity?.kinds} />
            </div>
            <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                <ProjectsCard repositories={activity?.repositories} />
                <HoursCard hours={activity?.hours} />
                <ConsistencyCard />
            </div>
            <div className='grid gap-6 xl:grid-cols-5'>
                <LatestReportCard
                    report={written?.[0]}
                    isLoading={reportsLoading}
                    className='xl:col-span-3'
                />
                <RecentCommitsCard className='xl:col-span-2' />
            </div>
        </div>
    )
}
