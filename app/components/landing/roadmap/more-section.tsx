import { Reveal } from '~/components/landing/reveal'
import { RoadmapFeatureCard } from '~/components/landing/roadmap/feature-card'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { ROADMAP_MORE, ROADMAP_SECTIONS } from '~/data/landing/roadmap'

export function RoadmapMoreSection() {
    return (
        <LandingSection className='border-t border-border'>
            <SectionHeading
                {...ROADMAP_SECTIONS.more}
                align='center'
            />
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {ROADMAP_MORE.map((feature) => (
                    <Reveal
                        key={feature.slug}
                        className='h-full'>
                        <RoadmapFeatureCard {...feature} />
                    </Reveal>
                ))}
            </div>
        </LandingSection>
    )
}
