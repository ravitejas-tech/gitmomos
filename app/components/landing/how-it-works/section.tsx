import { HowItWorksStep } from '~/components/landing/how-it-works/step'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { HOW_IT_WORKS_ID, HOW_IT_WORKS_STEPS } from '~/data/landing/how-it-works'
import { LANDING_SECTIONS } from '~/data/landing/sections'

export function HowItWorksSection() {
    return (
        <LandingSection
            id={HOW_IT_WORKS_ID}
            className='border-t border-border'>
            <SectionHeading {...LANDING_SECTIONS.howItWorks} />
            <ol className='grid gap-10 md:grid-cols-4 md:gap-0'>
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                    <HowItWorksStep
                        key={step.step}
                        order={index}
                        {...step}
                    />
                ))}
            </ol>
        </LandingSection>
    )
}
