import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartEmpty } from '~/components/activity/chart-empty'
import { KindLegend } from '~/components/activity/kind-legend'
import { ActivityTooltip } from '~/components/overview/activity-tooltip'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import {
    BAR_TOP_RADIUS,
    CHART_AXIS_TICK,
    CHART_CURSOR,
    CHART_GRID_STROKE,
    CHART_HEIGHT,
    CHART_MARGIN,
} from '~/data/activity/chart'
import { WORK_KIND_ORDER, WORK_KINDS } from '~/data/activity/kinds'
import { totalCommits } from '~/lib/activity/stats'
import { formatAxisDay, pluralize } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { ActivityDay } from '~/types/activity'

export function ActivityCard({ daily, className }: { daily: ActivityDay[] | undefined; className?: string }) {
    const kinds = WORK_KIND_ORDER.filter((kind) => daily?.some((day) => day.kinds[kind]))
    const data = daily?.map((day) => ({ date: day.date, ...day.kinds }))

    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader
                title='Commit activity'
                description={daily ? pluralize(totalCommits(daily), 'commit') : undefined}
            />
            <CardContent className='flex-1 space-y-4'>
                {!data && <Skeleton className='h-64' />}
                {data && kinds.length === 0 && <ChartEmpty />}
                {data && kinds.length > 0 && (
                    <>
                        <ResponsiveContainer
                            width='100%'
                            height={CHART_HEIGHT}>
                            <BarChart
                                data={data}
                                margin={CHART_MARGIN}>
                                <CartesianGrid
                                    vertical={false}
                                    stroke={CHART_GRID_STROKE}
                                />
                                <XAxis
                                    dataKey='date'
                                    tickFormatter={formatAxisDay}
                                    tick={CHART_AXIS_TICK}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={28}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={CHART_AXIS_TICK}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={CHART_CURSOR}
                                    content={ActivityTooltip}
                                />
                                {kinds.map((kind, index) => (
                                    <Bar
                                        key={kind}
                                        dataKey={kind}
                                        stackId='kinds'
                                        fill={WORK_KINDS[kind].color}
                                        radius={index === kinds.length - 1 ? BAR_TOP_RADIUS : 0}
                                        maxBarSize={32}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                        <KindLegend kinds={kinds} />
                    </>
                )}
            </CardContent>
        </Card>
    )
}
