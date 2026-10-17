import type { ComponentType } from 'react'
import { MessageSquarePlus } from 'lucide-react'
import { AskPreview } from '~/components/coming-soon/ask/preview'
import { StandupMessage } from '~/components/coming-soon/standup/message'
import { WrappedHero } from '~/components/coming-soon/wrapped/hero'
import { COMING_SOON } from '~/data/coming-soon/features'
import { NEW_ISSUE_URL } from '~/data/navigation'
import type { ComingSoonSlug } from '~/types/coming-soon'
import type { LandingAction } from '~/types/landing'

export const ROADMAP_HERO = {
    badge: 'Roadmap',
    note: `${COMING_SOON.length} features in the works`,
    title: ['What’s cooking', 'at gitmomos'],
    lead: 'New ways to share, understand and celebrate your work. Every one of them starts from the commits you already write.',
} as const

export const ROADMAP_SECTIONS = {
    spotlight: {
        eyebrow: 'A closer look',
        title: 'A taste of what’s coming',
        description: 'Real screens from features in the works, filled with sample data.',
    },
    more: {
        eyebrow: 'Also on the menu',
        title: 'And plenty more in the steamer',
        description: 'From your GitHub profile to your whole team, here is everything else on the way.',
    },
    cta: {
        title: 'Something else on your wishlist?',
        description: 'Open an issue on GitHub and tell us what would make your day easier.',
    },
} as const

export const ROADMAP_SUGGEST: LandingAction = {
    label: 'Suggest a feature',
    href: NEW_ISSUE_URL,
    icon: MessageSquarePlus,
}

export const ROADMAP_STATUS = 'Coming soon'

const SPOTLIGHT_PREVIEWS: Partial<Record<ComingSoonSlug, ComponentType>> = {
    wrapped: WrappedHero,
    standup: StandupMessage,
    ask: AskPreview,
}

export const ROADMAP_SPOTLIGHT = COMING_SOON.flatMap((feature) => {
    const preview = SPOTLIGHT_PREVIEWS[feature.slug]
    return preview ? [{ feature, preview }] : []
})

export const ROADMAP_MORE = COMING_SOON.filter(({ slug }) => !SPOTLIGHT_PREVIEWS[slug])
