import { Flame } from 'lucide-react'
import { HeatmapLegend } from '~/components/overview/heatmap-legend'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { HEATMAP_LEVEL_CLASSES } from '~/data/activity/heatmap'
import { CONSISTENCY_WEEKS } from '~/data/activity/ranges'
import { useActivity } from '~/hooks/activity/queries'
import { heatmapCells } from '~/lib/activity/heatmap'
import { lastWeeks } from '~/lib/activity/range'
import { activeDays, currentStreak } from '~/lib/activity/stats'
import { formatShortDay, pluralize } from '~/lib/format'
import { cn } from '~/lib/utils'

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
                        <div className='grid auto-cols-fr grid-flow-col grid-rows-7 gap-0.75'>
                            {heatmapCells(activity.daily).map((cell) => (
                                <span
                                    key={cell.date}
                                    title={`${formatShortDay(cell.date)}: ${pluralize(cell.commits, 'commit')}`}
                                    className={cn('aspect-square rounded-sm', HEATMAP_LEVEL_CLASSES[cell.level])}
                                />
                            ))}
                        </div>
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
