import { HeatmapGrid } from '~/components/activity/heatmap-grid'
import { HeatmapLegend } from '~/components/activity/heatmap-legend'
import { WorkMixBar } from '~/components/activity/work-mix-bar'
import { Card } from '~/components/ui/card'
import { MiniStatGrid } from '~/components/ui/mini-stat-grid'
import { Text } from '~/components/ui/text'
import { SAMPLE_ACTIVITY, SAMPLE_STATS, SAMPLE_WORK_MIX } from '~/data/landing/showcase-samples'
import { heatmapCells } from '~/lib/activity/heatmap'

export function AnalyticsShowcase() {
    return (
        <Card
            padding='lg'
            className='space-y-7'>
            <MiniStatGrid stats={SAMPLE_STATS} />
            <div className='space-y-3'>
                <Text variant='label'>Type of work</Text>
                <WorkMixBar kinds={SAMPLE_WORK_MIX} />
            </div>
            <div className='space-y-3'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <Text variant='label'>Last 6 months</Text>
                    <HeatmapLegend />
                </div>
                <HeatmapGrid cells={heatmapCells(SAMPLE_ACTIVITY)} />
            </div>
        </Card>
    )
}
