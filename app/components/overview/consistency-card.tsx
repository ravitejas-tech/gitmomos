import { Flame } from 'lucide-react'
import { HeatmapGrid } from '~/components/activity/heatmap-grid'
import { HeatmapLegend } from '~/components/overview/heatmap-legend'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { CONSISTENCY_WEEKS } from '~/data/activity/ranges'
import { useActivity } from '~/hooks/activity/queries'
import { heatmapCells } from '~/lib/activity/heatmap'
import { lastWeeks } from '~/lib/activity/range'
import { activeDays, currentStreak } from '~/lib/activity/stats'
import { pluralize } from '~/lib/format'

export function ConsistencyCard() {
    const { data: activity } = useActivity({ variables: lastWeeks(CONSISTENCY_WEEKS) })
    const streak = activity ? currentStreak(activity.daily) : 0

    return (
        <Card>
            <CardHeader
                title='Consistency'
                description='Last 6 months'
                actions={
                    streak > 0 && (
                        <Badge variant='accent'>
                            <Flame className='size-3.5' />
                            {pluralize(streak, 'day')} streak
                        </Badge>
                    )
                }
            />
            <CardContent className='space-y-4'>
                {!activity && <Skeleton className='h-48' />}
                {activity && (
                    <>
                        <HeatmapGrid cells={heatmapCells(activity.daily)} />
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                            <Text variant='caption'>{pluralize(activeDays(activity.daily), 'active day')}</Text>
                            <HeatmapLegend />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
