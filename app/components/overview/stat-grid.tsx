import { CalendarCheck, FileText, FolderGit2, GitCommitHorizontal } from 'lucide-react'
import { StatCard } from '~/components/overview/stat-card'
import { Skeleton } from '~/components/ui/skeleton'
import { activeDays, percentChange, totalCommits } from '~/lib/activity/stats'
import { pluralize } from '~/lib/format'
import type { Activity } from '~/types/activity'

export interface StatGridProps {
    activity: Activity | undefined
    days: number
    reports: number | undefined
}

export function StatGrid({ activity, days, reports }: StatGridProps) {
    if (!activity) {
        return (
            <div className='grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4'>
                {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton
                        key={index}
                        className='h-36'
                    />
                ))}
            </div>
        )
    }

    const commits = totalCommits(activity.daily)
    const active = activeDays(activity.daily)

    return (
        <div className='grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4'>
            <StatCard
                label='Commits'
                value={commits}
                icon={GitCommitHorizontal}
                change={percentChange(commits, activity.previous.commits)}
                hint={`vs previous ${days} days`}
            />
            <StatCard
                label='Active days'
                value={active}
                icon={CalendarCheck}
                change={percentChange(active, activity.previous.active_days)}
                hint={`of the last ${pluralize(days, 'day')}`}
            />
            <StatCard
                label='Projects'
                value={activity.repositories.length}
                icon={FolderGit2}
                hint='with new work'
            />
            <StatCard
                label='Reports'
                value={reports ?? 0}
                icon={FileText}
                hint='ready to share'
            />
        </div>
    )
}
