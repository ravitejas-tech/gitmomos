import { RoadmapSpotlightRow } from '~/components/landing/roadmap/spotlight-row'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { ROADMAP_SECTIONS, ROADMAP_SPOTLIGHT } from '~/data/landing/roadmap'

export function RoadmapSpotlightSection() {
    return (
        <LandingSection>
            <SectionHeading
                {...ROADMAP_SECTIONS.spotlight}
                align='center'
            />
            <div className='space-y-24 md:space-y-32'>
                {ROADMAP_SPOTLIGHT.map(({ feature, preview }, index) => (
                    <RoadmapSpotlightRow
                        key={feature.slug}
                        feature={feature}
                        preview={preview}
                        reverse={index % 2 === 1}
                    />
                ))}
            </div>
        </LandingSection>
    )
}
