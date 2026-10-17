import { Globe } from 'lucide-react'
import { HeatmapGrid } from '~/components/activity/heatmap-grid'
import { AddressBar } from '~/components/coming-soon/address-bar'
import { MiniStat } from '~/components/coming-soon/mini-stat'
import { ReportSection } from '~/components/reports/document/section'
import { Avatar } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { PROFILE, PROFILE_HEATMAP, PROFILE_SHIPPED, PROFILE_STATS } from '~/data/coming-soon/profile'
import { heatmapCells } from '~/lib/activity/heatmap'
import { sampleDays } from '~/lib/coming-soon/sample-days'

export function ProfilePreview() {
    return (
        <Card>
            <AddressBar
                icon={Globe}
                label={PROFILE.url}>
                <Badge variant='success'>Public</Badge>
            </AddressBar>
            <div className='space-y-6 p-5 sm:p-6'>
                <div className='flex items-center gap-4'>
                    <Avatar
                        name={PROFILE.name}
                        size='lg'
                    />
                    <div className='min-w-0'>
                        <Text
                            as='h3'
                            variant='heading'>
                            {PROFILE.name}
                        </Text>
                        <Text variant='caption'>{PROFILE.role}</Text>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {PROFILE_STATS.map((stat) => (
                        <MiniStat
                            key={stat.label}
                            {...stat}
                        />
                    ))}
                </div>
                <HeatmapGrid cells={heatmapCells(sampleDays(PROFILE_HEATMAP.start, PROFILE_HEATMAP.days))} />
                <ReportSection title='Recently shipped'>
                    <ul className='divide-y divide-border'>
                        {PROFILE_SHIPPED.map(({ date, title }) => (
                            <li
                                key={title}
                                className='flex items-baseline gap-4 py-2.5'>
                                <Text
                                    as='span'
                                    variant='caption'
                                    className='w-14 shrink-0'>
                                    {date}
                                </Text>
                                <Text as='span'>{title}</Text>
                            </li>
                        ))}
                    </ul>
                </ReportSection>
            </div>
        </Card>
    )
}
