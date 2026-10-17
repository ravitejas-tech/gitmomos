import { MeetTheCreatorSection } from '~/components/landing/creator/section'
import { CallToActionSection } from '~/components/landing/cta/section'
import { FaqSection } from '~/components/landing/faq/section'
import { FeaturesSection } from '~/components/landing/features/section'
import { HeroSection } from '~/components/landing/hero/section'
import { HowItWorksSection } from '~/components/landing/how-it-works/section'
import { PAGE_SEO } from '~/data/seo/pages'
import { SITE_KEYWORDS } from '~/data/seo/site'
import { HOME_STRUCTURED_DATA } from '~/data/seo/structured-data'
import { pageMeta } from '~/lib/seo/page-meta'

export function meta() {
    return [
        ...pageMeta(PAGE_SEO.home),
        { name: 'keywords', content: SITE_KEYWORDS.join(', ') },
        { 'script:ld+json': HOME_STRUCTURED_DATA },
    ]
}

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <MeetTheCreatorSection />
            <FaqSection />
            <CallToActionSection />
        </>
    )
}
