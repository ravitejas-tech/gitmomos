import type { ComponentType } from 'react'
import { AchievementsPreview } from '~/components/coming-soon/achievements/preview'
import { AskPreview } from '~/components/coming-soon/ask/preview'
import { BragDocPreview } from '~/components/coming-soon/brag-doc/preview'
import { DigestsPreview } from '~/components/coming-soon/digests/preview'
import { FocusPreview } from '~/components/coming-soon/focus/preview'
import { StandupPreview } from '~/components/coming-soon/standup/preview'
import { StatsCardPreview } from '~/components/coming-soon/stats-card/preview'
import { TeamPreview } from '~/components/coming-soon/team/preview'
import { TimesheetsPreview } from '~/components/coming-soon/timesheets/preview'
import { WrappedPreview } from '~/components/coming-soon/wrapped/preview'
import type { ComingSoonSlug } from '~/types/coming-soon'

export const COMING_SOON_PREVIEWS: Record<ComingSoonSlug, ComponentType> = {
    wrapped: WrappedPreview,
    standup: StandupPreview,
    ask: AskPreview,
    digests: DigestsPreview,
    'brag-doc': BragDocPreview,
    focus: FocusPreview,
    achievements: AchievementsPreview,
    timesheets: TimesheetsPreview,
    'stats-card': StatsCardPreview,
    team: TeamPreview,
}
