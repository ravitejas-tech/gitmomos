import { Reveal } from '~/components/landing/reveal'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading, type SectionHeadingProps } from '~/components/landing/section-heading'
import { ShowcaseCard } from '~/components/landing/showcase/card'
import type { FeatureSummary } from '~/types/landing'

export interface ShowcaseGridSectionProps {
    heading: SectionHeadingProps
    features: readonly FeatureSummary[]
    badge?: string
}

export function ShowcaseGridSection({ heading, features, badge }: ShowcaseGridSectionProps) {
    return (
        <LandingSection className='border-t border-border'>
            <SectionHeading
                {...heading}
                align='center'
            />
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {features.map((feature, index) => (
                    <Reveal
                        key={feature.slug}
                        order={index}
                        className='h-full'>
                        <ShowcaseCard
                            feature={feature}
                            badge={badge}
                        />
                    </Reveal>
                ))}
            </div>
        </LandingSection>
    )
}
