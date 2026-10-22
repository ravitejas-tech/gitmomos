import { WorkMixBar } from '~/components/activity/work-mix-bar'
import { DigestDayRow } from '~/components/coming-soon/digests/day-row'
import { MiniStat } from '~/components/ui/mini-stat'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { DIGEST_DAYS, DIGEST_KINDS, DIGEST_MONTH, DIGEST_WEEK } from '~/data/coming-soon/digests'

export function DigestsPreview() {
    return (
        <div className='space-y-4'>
            <Card
                padding='lg'
                className='space-y-5'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <Text variant='eyebrow'>{DIGEST_WEEK.label}</Text>
                    <Badge variant='neutral'>{DIGEST_WEEK.commits} commits</Badge>
                </div>
                <div className='space-y-2'>
                    <Text
                        as='h3'
                        variant='heading'>
                        {DIGEST_WEEK.headline}
                    </Text>
                    <Text tone='secondary'>{DIGEST_WEEK.summary}</Text>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {DIGEST_WEEK.areas.map((area) => (
                        <Badge
                            key={area}
                            variant='accent'>
                            {area}
                        </Badge>
                    ))}
                </div>
                <WorkMixBar kinds={DIGEST_KINDS} />
                <ul className='divide-y divide-border overflow-hidden rounded-lg border border-border'>
                    {DIGEST_DAYS.map((day) => (
                        <DigestDayRow
                            key={day.day}
                            {...day}
                        />
                    ))}
                </ul>
            </Card>
            <Card
                padding='md'
                className='space-y-3'>
                <Text variant='title'>October so far</Text>
                <div className='grid grid-cols-3 gap-4'>
                    {DIGEST_MONTH.map((stat) => (
                        <MiniStat
                            key={stat.label}
                            {...stat}
                        />
                    ))}
                </div>
            </Card>
        </div>
    )
}
