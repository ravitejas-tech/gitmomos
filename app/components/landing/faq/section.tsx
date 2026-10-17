import { FaqItem } from '~/components/landing/faq/item'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { LandingSplit } from '~/components/landing/split'
import { FAQ, FAQ_ID } from '~/data/landing/faq'
import { LANDING_SECTIONS } from '~/data/landing/sections'

export function FaqSection() {
    return (
        <LandingSection
            id={FAQ_ID}
            className='border-t border-border'>
            <LandingSplit
                aside={
                    <SectionHeading
                        {...LANDING_SECTIONS.faq}
                        className='mb-0 md:mb-0'
                    />
                }>
                <div className='divide-y divide-border border-y border-border'>
                    {FAQ.map((item) => (
                        <FaqItem
                            key={item.question}
                            {...item}
                        />
                    ))}
                </div>
            </LandingSplit>
        </LandingSection>
    )
}
