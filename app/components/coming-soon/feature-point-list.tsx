import { DetailItem } from '~/components/ui/detail-item'
import { IconChip } from '~/components/ui/icon-chip'
import type { ComingSoonPoint } from '~/types/coming-soon'

export function FeaturePointList({ points }: { points: readonly ComingSoonPoint[] }) {
    return (
        <ul className='space-y-5'>
            {points.map(({ icon, ...point }) => (
                <DetailItem
                    key={point.title}
                    leading={
                        <IconChip
                            icon={icon}
                            tone='accent'
                        />
                    }
                    {...point}
                />
            ))}
        </ul>
    )
}
