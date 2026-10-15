import { ChartEmpty } from '~/components/activity/chart-empty'
import { ProjectRow } from '~/components/overview/project-row'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import { TOP_PROJECTS } from '~/data/activity/ranges'
import { share } from '~/lib/activity/stats'
import type { Activity } from '~/types/activity'

export function ProjectsCard({ repositories }: { repositories: Activity['repositories'] | undefined }) {
    const total = repositories?.reduce((sum, item) => sum + item.commits, 0) ?? 0
    const max = repositories?.[0]?.commits ?? 0

    return (
        <Card>
            <CardHeader title='Projects' />
            <CardContent>
                {!repositories && <Skeleton className='h-56' />}
                {repositories?.length === 0 && <ChartEmpty />}
                {repositories && repositories.length > 0 && (
                    <ul className='space-y-4'>
                        {repositories.slice(0, TOP_PROJECTS).map(({ name, commits }) => (
                            <ProjectRow
                                key={name}
                                name={name}
                                commits={commits}
                                percent={share(commits, total)}
                                width={share(commits, max)}
                            />
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
