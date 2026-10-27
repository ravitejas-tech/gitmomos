import { DetailItem } from '~/components/ui/detail-item'
import { IconChip } from '~/components/ui/icon-chip'
import type { FeaturePoint } from '~/types/landing'

export function FeaturePointList({ points }: { points: readonly FeaturePoint[] }) {
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
