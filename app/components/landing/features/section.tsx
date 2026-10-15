import { FeatureTile } from '~/components/landing/features/tile'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { FEATURES } from '~/data/landing/features'
import { LANDING_SECTIONS } from '~/data/landing/sections'

export function FeaturesSection() {
    return (
        <LandingSection>
            <SectionHeading {...LANDING_SECTIONS.features} />
            <div className='grid gap-3 md:grid-cols-6'>
                {FEATURES.map((feature) => (
                    <FeatureTile
                        key={feature.title}
                        {...feature}
                    />
                ))}
            </div>
        </LandingSection>
    )
}
