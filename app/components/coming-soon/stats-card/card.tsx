import { WorkMixBar } from '~/components/activity/work-mix-bar'
import { MiniStat } from '~/components/ui/mini-stat'
import { Card } from '~/components/ui/card'
import { Logo } from '~/components/ui/logo'
import { Text } from '~/components/ui/text'
import { STATS_CARD_FOCUS, STATS_CARD_KINDS, STATS_CARD_PERIOD, STATS_CARD_STATS } from '~/data/coming-soon/stats-card'

export function StatsCard() {
    return (
        <Card
            padding='md'
            className='max-w-lg space-y-4'>
            <div className='flex items-center justify-between gap-3'>
                <Logo />
                <Text
                    as='span'
                    variant='caption'>
                    {STATS_CARD_PERIOD}
                </Text>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {STATS_CARD_STATS.map((stat) => (
                    <MiniStat
                        key={stat.label}
                        {...stat}
                    />
                ))}
            </div>
            <WorkMixBar kinds={STATS_CARD_KINDS} />
            <Text variant='caption'>{STATS_CARD_FOCUS}</Text>
        </Card>
    )
}
