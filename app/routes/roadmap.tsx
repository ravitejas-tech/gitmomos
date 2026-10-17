import { CallToActionSection } from '~/components/landing/cta/section'
import { RoadmapHero } from '~/components/landing/roadmap/hero'
import { RoadmapMoreSection } from '~/components/landing/roadmap/more-section'
import { RoadmapSpotlightSection } from '~/components/landing/roadmap/spotlight-section'
import { ROADMAP_HERO, ROADMAP_SECTIONS, ROADMAP_SUGGEST } from '~/data/landing/roadmap'

export function meta() {
    return [{ title: 'Roadmap | Gitmomos' }, { name: 'description', content: ROADMAP_HERO.lead }]
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
