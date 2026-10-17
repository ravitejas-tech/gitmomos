import { HEATMAP_LEVEL_CLASSES } from '~/data/activity/heatmap'
import { formatShortDay, pluralize } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { HeatmapCell } from '~/types/activity'

export function HeatmapGrid({ cells }: { cells: HeatmapCell[] }) {
    return (
        <div className='grid auto-cols-fr grid-flow-col grid-rows-7 gap-0.75'>
            {cells.map((cell) => (
                <span
                    key={cell.date}
                    title={`${formatShortDay(cell.date)}: ${pluralize(cell.commits, 'commit')}`}
                    className={cn('aspect-square rounded-sm', HEATMAP_LEVEL_CLASSES[cell.level])}
                />
            ))}
        </div>
    )
}
