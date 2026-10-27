import { CreatorProfile } from '~/components/landing/creator/profile'
import { CreatorStory } from '~/components/landing/creator/story'
import { Reveal } from '~/components/landing/reveal'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { LandingSplit } from '~/components/landing/split'
import { LANDING_SECTIONS } from '~/data/landing/sections'

export function MeetTheCreatorSection() {
    return (
        <LandingSection className='border-t border-border'>
            <LandingSplit
                aside={
                    <>
                        <SectionHeading
                            {...LANDING_SECTIONS.creator}
                            animated={false}
                        />
                        <CreatorProfile />
                    </>
                }>
                <Reveal>
                    <CreatorStory />
                </Reveal>
            </LandingSplit>
        </LandingSection>
    )
}
