import { FeaturePointList } from '~/components/coming-soon/feature-point-list'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import type { FeaturePoint } from '~/types/landing'

export function FeaturePoints({ points }: { points: readonly FeaturePoint[] }) {
    return (
        <Card>
            <CardHeader title='What you’ll get' />
            <CardContent>
                <FeaturePointList points={points} />
            </CardContent>
        </Card>
    )
}
