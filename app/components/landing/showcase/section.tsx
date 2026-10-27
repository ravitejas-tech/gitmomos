import { LandingSection } from '~/components/landing/section'
import { SectionHeading, type SectionHeadingProps } from '~/components/landing/section-heading'
import { ShowcaseRow } from '~/components/landing/showcase/row'
import type { FeatureShowcase } from '~/types/landing'

export interface ShowcaseSectionProps {
    heading: SectionHeadingProps
    items: readonly FeatureShowcase[]
    tag?: string
}

export function ShowcaseSection({ heading, items, tag }: ShowcaseSectionProps) {
    return (
        <LandingSection>
            <SectionHeading
                {...heading}
                align='center'
            />
            <div className='space-y-24 md:space-y-32'>
                {items.map(({ feature, preview }, index) => (
                    <ShowcaseRow
                        key={feature.slug}
                        feature={feature}
                        preview={preview}
                        tag={tag ?? feature.label}
                        reverse={index % 2 === 1}
                    />
                ))}
            </div>
        </LandingSection>
    )
}
