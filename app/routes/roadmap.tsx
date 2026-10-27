import { CallToActionSection } from '~/components/landing/cta/section'
import { RoadmapHero } from '~/components/landing/roadmap/hero'
import { ShowcaseGridSection } from '~/components/landing/showcase/grid-section'
import { ShowcaseSection } from '~/components/landing/showcase/section'
import {
    ROADMAP_MORE,
    ROADMAP_SECTIONS,
    ROADMAP_SPOTLIGHT,
    ROADMAP_STATUS,
    ROADMAP_SUGGEST,
} from '~/data/landing/roadmap'
import { PAGE_SEO } from '~/data/seo/pages'
import { pageMeta } from '~/lib/seo/page-meta'

export function meta() {
    return pageMeta(PAGE_SEO.roadmap)
}

export default function Roadmap() {
    return (
        <>
            <RoadmapHero />
            <ShowcaseSection
                heading={ROADMAP_SECTIONS.spotlight}
                items={ROADMAP_SPOTLIGHT}
                tag={ROADMAP_STATUS}
            />
            <ShowcaseGridSection
                heading={ROADMAP_SECTIONS.more}
                features={ROADMAP_MORE}
                badge={ROADMAP_STATUS}
            />
            <CallToActionSection
                heading={ROADMAP_SECTIONS.cta}
                secondary={ROADMAP_SUGGEST}
            />
        </>
    )
}
