import type { ComponentType } from 'react'
import { FeaturePointList } from '~/components/coming-soon/feature-point-list'
import { LandingIconPill } from '~/components/landing/icon-pill'
import { Reveal } from '~/components/landing/reveal'
import { RoadmapWindow } from '~/components/landing/roadmap/window'
import { Text } from '~/components/ui/text'
import { ROADMAP_STATUS } from '~/data/landing/roadmap'
import { cn } from '~/lib/utils'
import type { ComingSoonFeature } from '~/types/coming-soon'

export interface RoadmapSpotlightRowProps {
    feature: ComingSoonFeature
    preview: ComponentType
    reverse: boolean
}

export function RoadmapSpotlightRow({ feature, preview: Preview, reverse }: RoadmapSpotlightRowProps) {
    return (
        <Reveal className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
            <div
                id={feature.slug}
                className='scroll-mt-24 space-y-6'>
                <LandingIconPill
                    icon={feature.icon}
                    label={ROADMAP_STATUS}
                />
                <div className='space-y-3'>
                    <Text
                        as='h3'
                        variant='document-title'
                        tone='gradient'>
                        {feature.title}
                    </Text>
                    <Text
                        variant='lead'
                        tone='secondary'>
                        {feature.description}
                    </Text>
                </div>
                <FeaturePointList points={feature.points} />
            </div>
            <div className={cn(reverse && 'lg:order-first')}>
                <RoadmapWindow title={feature.title}>
                    <Preview />
                </RoadmapWindow>
            </div>
        </Reveal>
    )
}
