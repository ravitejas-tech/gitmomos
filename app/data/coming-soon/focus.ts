import { Moon, Shuffle, Timer } from 'lucide-react'

export const FOCUS_STATS = [
    { label: 'Deep work', value: 9, hint: 'sessions, 2h 10m on average', icon: Timer },
    { label: 'Switching', value: '6 / day', hint: 'down from 9 last week', icon: Shuffle },
    { label: 'Late nights', value: 4, hint: 'commits after 11 PM', icon: Moon },
] as const

export const FOCUS_BLOCK_STYLES = {
    deep: { label: 'Deep work', dot: 'bg-accent' },
    quick: { label: 'Quick changes', dot: 'bg-accent/35' },
    late: { label: 'Late night', dot: 'bg-warning' },
} as const

export const FOCUS_DAY = {
    label: 'Thursday, Oct 15',
    start: 8,
    end: 24,
    blocks: [
        { from: 9, to: 11.5, kind: 'deep' },
        { from: 11.5, to: 12.25, kind: 'quick' },
        { from: 13.5, to: 16, kind: 'deep' },
        { from: 16, to: 17.5, kind: 'quick' },
        { from: 22.5, to: 23.75, kind: 'late' },
    ],
} as const

export const FOCUS_TICKS = ['8 AM', '12 PM', '4 PM', '8 PM', '12 AM'] as const

export const FOCUS_ALERT =
    'You have committed after 11 PM on 4 of the last 5 nights, and your focus sessions were 30% shorter the next day. Maybe call it a day a little earlier tonight.'
