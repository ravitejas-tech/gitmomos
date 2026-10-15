import { CreatorProfile } from '~/components/landing/creator/profile'
import { CreatorStory } from '~/components/landing/creator/story'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { LANDING_SECTIONS } from '~/data/landing/sections'

export function MeetTheCreatorSection() {
    return (
        <LandingSection className='border-t border-border'>
            <div className='grid gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16 lg:gap-24'>
                <div className='md:sticky md:top-24 md:self-start'>
                    <SectionHeading {...LANDING_SECTIONS.creator} />
                    <CreatorProfile />
                </div>
                <CreatorStory />
            </div>
        </LandingSection>
    )
}
