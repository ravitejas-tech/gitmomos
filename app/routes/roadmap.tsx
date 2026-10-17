import { CallToActionSection } from '~/components/landing/cta/section'
import { RoadmapHero } from '~/components/landing/roadmap/hero'
import { RoadmapMoreSection } from '~/components/landing/roadmap/more-section'
import { RoadmapSpotlightSection } from '~/components/landing/roadmap/spotlight-section'
import { ROADMAP_SECTIONS, ROADMAP_SUGGEST } from '~/data/landing/roadmap'
import { PAGE_SEO } from '~/data/seo/pages'
import { pageMeta } from '~/lib/seo/page-meta'

export function meta() {
    return pageMeta(PAGE_SEO.roadmap)
}

export default function Roadmap() {
    return (
        <>
            <RoadmapHero />
            <RoadmapSpotlightSection />
            <RoadmapMoreSection />
            <CallToActionSection
                heading={ROADMAP_SECTIONS.cta}
                secondary={ROADMAP_SUGGEST}
            />
        </>
    )
}
