import { FEED_WINDOW_DAYS } from '~/data/community/constants'
import { daysAgo, shiftDay } from '~/lib/calendar'
import { formatDay, todayLocal } from '~/lib/format'
import type { DayRange } from '~/types/activity'
import type { FeedActivity, FeedDay, FeedEntry, FeedUpdate } from '~/types/community'

export function feedWindow(index: number): DayRange {
    const to = shiftDay(todayLocal(), -index * FEED_WINDOW_DAYS)
    return { from: shiftDay(to, 1 - FEED_WINDOW_DAYS), to }
}

export function isActivity(entry: FeedEntry): entry is FeedActivity {
    return entry.kind === 'follow' || entry.kind === 'star' || entry.kind === 'comment'
}

export function isUpdate(entry: FeedEntry): entry is FeedUpdate {
    return !isActivity(entry)
}

export function groupFeedByDay(entries: FeedUpdate[]): FeedDay[] {
    return [...Map.groupBy(entries, ({ date }) => date)].map(([date, dayEntries]) => ({ date, entries: dayEntries }))
}

export function feedDayLabel(date: string): string {
    const age = daysAgo(date)
    if (age <= 0) return 'Today'
    if (age === 1) return 'Yesterday'
    return formatDay(date, { year: undefined })
}
