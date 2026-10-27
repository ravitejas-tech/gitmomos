import type { ComponentType } from 'react'
import { AnalyticsShowcase } from '~/components/landing/showcase/previews/analytics'
import { MomiShowcase } from '~/components/landing/showcase/previews/momi'
import { ProfileShowcase } from '~/components/landing/showcase/previews/profile'
import { TimesheetShowcase } from '~/components/landing/showcase/previews/timesheet'
import { SHOWCASE_FEATURES } from '~/data/landing/showcase'
import type { FeatureShowcase, ShowcaseSlug } from '~/types/landing'

const SHOWCASE_PREVIEWS: Record<ShowcaseSlug, ComponentType> = {
    timesheet: TimesheetShowcase,
    'public-profile': ProfileShowcase,
    momi: MomiShowcase,
    analytics: AnalyticsShowcase,
}

export const SHOWCASE: readonly FeatureShowcase[] = SHOWCASE_FEATURES.map((feature) => ({
    feature,
    preview: SHOWCASE_PREVIEWS[feature.slug],
}))
