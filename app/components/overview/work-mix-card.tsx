import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { ChartEmpty } from '~/components/activity/chart-empty'
import { KindDot } from '~/components/activity/kind-dot'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { WORK_KINDS } from '~/data/activity/kinds'
import { share } from '~/lib/activity/stats'
import type { Activity } from '~/types/activity'

export function WorkMixCard({ kinds }: { kinds: Activity['kinds'] | undefined }) {
    const total = kinds?.reduce((sum, item) => sum + item.commits, 0) ?? 0

    return (
        <Card>
            <CardHeader title='Type of work' />
            <CardContent>
                {!kinds && <Skeleton className='h-72' />}
                {kinds && total === 0 && <ChartEmpty />}
                {kinds && total > 0 && (
                    <div className='space-y-6'>
                        <div className='relative mx-auto size-44'>
                            <ResponsiveContainer
                                width='100%'
                                height='100%'>
                                <PieChart>
                                    <Pie
                                        data={kinds}
                                        dataKey='commits'
                                        nameKey='kind'
                                        innerRadius='72%'
                                        outerRadius='100%'
                                        paddingAngle={2}
                                        stroke='none'
                                        isAnimationActive={false}>
                                        {kinds.map(({ kind }) => (
                                            <Cell
                                                key={kind}
                                                fill={WORK_KINDS[kind].color}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                <Text variant='stat'>{total}</Text>
                                <Text variant='caption'>commits</Text>
                            </div>
                        </div>
                        <ul className='space-y-2.5'>
                            {kinds.map(({ kind, commits }) => (
                                <li
                                    key={kind}
                                    className='flex items-center gap-2.5'>
                                    <KindDot kind={kind} />
                                    <Text
                                        as='span'
                                        className='flex-1'>
                                        {WORK_KINDS[kind].label}
                                    </Text>
                                    <Text
                                        as='span'
                                        variant='caption'
                                        numeric>
                                        {commits}
                                    </Text>
                                    <Text
                                        as='span'
                                        variant='strong'
                                        numeric
                                        className='w-10 text-right'>
                                        {share(commits, total)}%
                                    </Text>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
