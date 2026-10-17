import { LandingActionLink } from '~/components/landing/action-link'
import { LandingBadgePill } from '~/components/landing/badge-pill'
import { GetStartedButton } from '~/components/landing/get-started-button'
import { HeroIntro } from '~/components/landing/hero/intro'
import { HeroShell } from '~/components/landing/hero/shell'
import { RoadmapMenu } from '~/components/landing/roadmap/menu'
import { ROADMAP_HERO, ROADMAP_SUGGEST } from '~/data/landing/roadmap'

export function RoadmapHero() {
    return (
        <HeroShell className='pb-8 md:pb-12'>
            <HeroIntro
                badge={
                    <LandingBadgePill
                        badge={ROADMAP_HERO.badge}
                        label={ROADMAP_HERO.note}
                    />
                }
                title={ROADMAP_HERO.title}
                lead={ROADMAP_HERO.lead}
                actions={
                    <>
                        <GetStartedButton />
                        <LandingActionLink {...ROADMAP_SUGGEST} />
                    </>
                }
                footer={<RoadmapMenu />}
            />
        </HeroShell>
    )
}
