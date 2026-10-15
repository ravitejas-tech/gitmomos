import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ChartEmpty } from '~/components/activity/chart-empty'
import { HoursTooltip } from '~/components/overview/hours-tooltip'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import { BAR_TOP_RADIUS, CHART_ACCENT, CHART_AXIS_TICK, CHART_CURSOR } from '~/data/activity/chart'
import { HOUR_TICK_INTERVAL } from '~/data/activity/ranges'
import { activeHourWindow, peakHour } from '~/lib/activity/stats'
import { formatHour } from '~/lib/format'
import type { Activity } from '~/types/activity'

export function HoursCard({ hours }: { hours: Activity['hours'] | undefined }) {
    const peak = hours ? peakHour(hours) : null

    return (
        <Card>
            <CardHeader
                title='When you work'
                description={peak === null ? undefined : `Busiest around ${formatHour(peak)}`}
            />
            <CardContent>
                {!hours && <Skeleton className='h-56' />}
                {hours && peak === null && <ChartEmpty />}
                {hours && peak !== null && (
                    <ResponsiveContainer
                        width='100%'
                        height={220}>
                        <BarChart data={activeHourWindow(hours)}>
                            <XAxis
                                dataKey='hour'
                                interval={HOUR_TICK_INTERVAL}
                                tickFormatter={formatHour}
                                tick={CHART_AXIS_TICK}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={CHART_CURSOR}
                                content={HoursTooltip}
                            />
                            <Bar
                                dataKey='commits'
                                radius={BAR_TOP_RADIUS}>
                                {activeHourWindow(hours).map(({ hour }) => (
                                    <Cell
                                        key={hour}
                                        fill={CHART_ACCENT}
                                        fillOpacity={hour === peak ? 1 : 0.4}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}
