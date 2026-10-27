import { MeetTheCreatorSection } from '~/components/landing/creator/section'
import { CallToActionSection } from '~/components/landing/cta/section'
import { FaqSection } from '~/components/landing/faq/section'
import { FeaturesSection } from '~/components/landing/features/section'
import { HeroSection } from '~/components/landing/hero/section'
import { HowItWorksSection } from '~/components/landing/how-it-works/section'
import { ShowcaseGridSection } from '~/components/landing/showcase/grid-section'
import { ShowcaseSection } from '~/components/landing/showcase/section'
import { LANDING_SECTIONS } from '~/data/landing/sections'
import { EXTRA_FEATURES } from '~/data/landing/showcase'
import { SHOWCASE } from '~/data/landing/showcase-previews'
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
            <ShowcaseSection
                heading={LANDING_SECTIONS.showcase}
                items={SHOWCASE}
            />
            <ShowcaseGridSection
                heading={LANDING_SECTIONS.extras}
                features={EXTRA_FEATURES}
            />
            <HowItWorksSection />
            <MeetTheCreatorSection />
            <FaqSection />
            <CallToActionSection />
        </>
    )
}
