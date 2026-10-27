import { FeaturePointList } from '~/components/coming-soon/feature-point-list'
import { LandingIconPill } from '~/components/landing/icon-pill'
import { Reveal } from '~/components/landing/reveal'
import { ShowcaseWindow } from '~/components/landing/showcase/window'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { FeatureShowcase } from '~/types/landing'

export interface ShowcaseRowProps extends FeatureShowcase {
    tag: string
    reverse: boolean
}

export function ShowcaseRow({ feature, preview: Preview, tag, reverse }: ShowcaseRowProps) {
    return (
        <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
            <Reveal
                id={feature.slug}
                className='scroll-mt-24 space-y-6'>
                <LandingIconPill
                    icon={feature.icon}
                    label={tag}
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
            </Reveal>
            <Reveal
                order={1}
                className={cn('min-w-0', reverse && 'lg:order-first')}>
                <ShowcaseWindow title={feature.label}>
                    <Preview />
                </ShowcaseWindow>
            </Reveal>
        </div>
    )
}
