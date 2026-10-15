import { Github } from 'lucide-react'
import { Backdrop } from '~/components/landing/backdrop'
import { GetStartedButton } from '~/components/landing/get-started-button'
import { LandingSection } from '~/components/landing/section'
import { SectionHeading } from '~/components/landing/section-heading'
import { Button } from '~/components/ui/button'
import { LogoMark } from '~/components/ui/logo-mark'
import { LANDING_SECTIONS } from '~/data/landing/sections'
import { REPO_URL } from '~/data/navigation'

export function CallToActionSection() {
    return (
        <LandingSection className='overflow-hidden border-t border-border md:py-36'>
            <Backdrop />
            <div className='flex flex-col items-center'>
                <span className='mb-8 flex size-14 items-center justify-center rounded-2xl border border-border-strong bg-surface shadow-overlay'>
                    <LogoMark className='size-8' />
                </span>
                <SectionHeading
                    {...LANDING_SECTIONS.cta}
                    align='center'
                    className='mb-10 md:mb-10'
                />
                <div className='flex flex-wrap items-center justify-center gap-3'>
                    <GetStartedButton />
                    <Button
                        asChild
                        variant='ghost'
                        size='pill'>
                        <a
                            href={REPO_URL}
                            target='_blank'
                            rel='noreferrer'>
                            <Github />
                            Star on GitHub
                        </a>
                    </Button>
                </div>
            </div>
        </LandingSection>
    )
}
