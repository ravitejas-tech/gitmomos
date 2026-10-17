import { Card } from '~/components/ui/card'
import { Legend } from '~/components/ui/legend'
import { Text } from '~/components/ui/text'
import { FOCUS_BLOCK_STYLES, FOCUS_DAY, FOCUS_TICKS } from '~/data/coming-soon/focus'
import { share } from '~/lib/activity/stats'
import { cn } from '~/lib/utils'

export function FocusTimeline() {
    const { label, start, end, blocks } = FOCUS_DAY
    const span = end - start

    return (
        <Card
            padding='md'
            className='space-y-4'>
            <Text variant='title'>{label}</Text>
            <div className='space-y-2'>
                <div className='relative h-9 overflow-hidden rounded-md bg-surface-muted'>
                    {blocks.map(({ from, to, kind }) => (
                        <span
                            key={from}
                            className={cn('absolute inset-y-1 rounded-sm', FOCUS_BLOCK_STYLES[kind].dot)}
                            style={{ left: `${share(from - start, span)}%`, width: `${share(to - from, span)}%` }}
                        />
                    ))}
                </div>
                <div className='flex justify-between'>
                    {FOCUS_TICKS.map((tick) => (
                        <Text
                            key={tick}
                            as='span'
                            variant='micro'>
                            {tick}
                        </Text>
                    ))}
                </div>
            </div>
            <Legend items={Object.values(FOCUS_BLOCK_STYLES)} />
        </Card>
    )
}
