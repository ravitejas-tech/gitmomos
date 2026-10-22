import type { z } from 'zod'
import type { ACTIVITY_RANGES } from '~/data/activity/ranges'
import type { activitySchema } from '~/schemas/activity.schema'
import type { Enums } from '~/types/database'

export type Activity = z.infer<typeof activitySchema>
export type ActivityDay = Activity['daily'][number]
export type DayCount = Pick<ActivityDay, 'date' | 'commits'>
export type WorkKind = Enums<'work_kind'>
export type ActivityRange = (typeof ACTIVITY_RANGES)[number]['value']

export interface DayRange {
    from: string
    to: string
}

export interface HeatmapCell {
    date: string
    commits: number
    level: number
}
