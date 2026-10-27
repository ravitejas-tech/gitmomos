import { HeatmapGrid } from '~/components/activity/heatmap-grid'
import { HeatmapLegend } from '~/components/activity/heatmap-legend'
import { OverviewSection } from '~/components/public-profile/page/overview/section'
import { MiniStatGrid } from '~/components/ui/mini-stat-grid'
import { Text } from '~/components/ui/text'
import { trackRecordStats } from '~/data/public-profile/track-record'
import { heatmapCells } from '~/lib/activity/heatmap'
import type { PublicProfile } from '~/types/public-profile'

export function TrackRecord({ profile }: { profile: PublicProfile }) {
    return (
        <OverviewSection title='Track record'>
            <div className='space-y-6'>
                <MiniStatGrid
                    stats={trackRecordStats(profile.stats)}
                    size='lg'
                />
                <div className='space-y-3'>
                    <HeatmapGrid cells={heatmapCells(profile.daily)} />
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                        <Text variant='caption'>Activity, last 6 months</Text>
                        <HeatmapLegend />
                    </div>
                </div>
            </div>
        </OverviewSection>
    )
}
