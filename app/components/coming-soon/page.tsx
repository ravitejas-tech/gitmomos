import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { FeaturePoints } from '~/components/coming-soon/feature-points'
import { PreviewFrame } from '~/components/coming-soon/preview-frame'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { Badge } from '~/components/ui/badge'
import type { ComingSoonFeature } from '~/types/coming-soon'

export interface ComingSoonPageProps {
    feature: ComingSoonFeature
    children: ReactNode
}

export function ComingSoonPage({ feature, children }: ComingSoonPageProps) {
    return (
        <DashboardPage
            title={feature.title}
            description={feature.description}
            actions={
                <Badge variant='accent'>
                    <Sparkles className='size-3.5' />
                    Coming soon
                </Badge>
            }>
            <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]'>
                <PreviewFrame>{children}</PreviewFrame>
                <FeaturePoints points={feature.points} />
            </div>
        </DashboardPage>
    )
}
