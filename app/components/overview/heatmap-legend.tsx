import { Text } from '~/components/ui/text'
import { HEATMAP_LEVEL_CLASSES } from '~/data/activity/heatmap'
import { cn } from '~/lib/utils'

export function HeatmapLegend() {
    return (
        <div className='flex items-center gap-1.5'>
            <Text
                as='span'
                variant='micro'>
                Less
            </Text>
            {HEATMAP_LEVEL_CLASSES.map((level) => (
                <span
                    key={level}
                    className={cn('size-3 rounded-sm', level)}
                />
            ))}
            <Text
                as='span'
                variant='micro'>
                More
            </Text>
        </div>
    )
}
