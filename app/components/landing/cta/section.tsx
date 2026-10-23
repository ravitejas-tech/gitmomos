import { LandingActionLink } from '~/components/landing/action-link'
import { Backdrop } from '~/components/ui/backdrop'
import { GetStartedButton } from '~/components/landing/get-started-button'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { LogoMark } from '~/components/ui/logo-mark'
import { CTA_STAR } from '~/data/landing/cta'
import { LANDING_SECTIONS } from '~/data/landing/sections'
import type { LandingAction, LandingHeading } from '~/types/landing'

export interface CallToActionSectionProps {
    heading?: LandingHeading
    secondary?: LandingAction
}

export function CallToActionSection({
    heading = LANDING_SECTIONS.cta,
    secondary = CTA_STAR,
}: CallToActionSectionProps) {
    return (
        <LandingSection className='overflow-hidden border-t border-border md:py-36'>
            <Backdrop />
            <div className='flex flex-col items-center'>
                <span className='mb-8 flex size-14 items-center justify-center rounded-2xl border border-border-strong bg-surface shadow-overlay'>
                    <LogoMark className='size-8' />
                </span>
                <SectionHeading
                    {...heading}
                    align='center'
                    className='mb-10 md:mb-10'
                />
                <div className='flex flex-wrap items-center justify-center gap-3'>
                    <GetStartedButton />
                    <LandingActionLink {...secondary} />
                </div>
            </div>
        </LandingSection>
    )
}
