import { MeetTheCreatorSection } from '~/components/landing/creator/section'
import { CallToActionSection } from '~/components/landing/cta/section'
import { FeaturesSection } from '~/components/landing/features/section'
import { HeroSection } from '~/components/landing/hero/section'
import { HowItWorksSection } from '~/components/landing/how-it-works/section'

export function meta() {
    return [
        { title: 'gitmomos: daily work reports from your git commits' },
        {
            name: 'description',
            content:
                'Connect GitHub or Gitea once. Every night gitmomos turns your commits into a stand-up ready daily report.',
        },
    ]
}

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <MeetTheCreatorSection />
            <CallToActionSection />
        </>
    )
}
