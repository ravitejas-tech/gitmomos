import { Flame } from 'lucide-react'
import { HeatmapGrid } from '~/components/activity/heatmap-grid'
import { HeatmapLegend } from '~/components/activity/heatmap-legend'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { heatmapCells } from '~/lib/activity/heatmap'
import { activeDays, currentStreak } from '~/lib/activity/stats'
import { pluralize } from '~/lib/format'
import type { DayCount } from '~/types/activity'

export function ConsistencyCard({ daily }: { daily: DayCount[] | undefined }) {
    const streak = daily ? currentStreak(daily) : 0

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
                {!daily && <Skeleton className='h-48' />}
                {daily && (
                    <>
                        <HeatmapGrid cells={heatmapCells(daily)} />
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                            <Text variant='caption'>{pluralize(activeDays(daily), 'active day')}</Text>
                            <HeatmapLegend />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
