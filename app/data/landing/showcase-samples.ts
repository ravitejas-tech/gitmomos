import { shiftDay } from '~/lib/calendar'
import type { Activity, DayCount } from '~/types/activity'

const SEPTEMBER_EDITED_DAY = 18

const SEPTEMBER_HOURS = [
    [1, 402, 10],
    [2, 455, 12],
    [3, 371, 9],
    [4, 298, 7],
    [7, 436, 11],
    [8, 489, 13],
    [9, 415, 10],
    [10, 352, 8],
    [11, 267, 6],
    [12, 95, 3],
    [14, 468, 12],
    [15, 503, 14],
    [16, 421, 11],
    [17, 384, 9],
    [18, 240, 0],
    [21, 447, 12],
    [22, 512, 15],
    [23, 398, 10],
    [24, 436, 11],
    [25, 312, 8],
    [27, 52, 2],
    [28, 425, 11],
    [29, 478, 13],
    [30, 389, 10],
] as const

export const SAMPLE_TIMESHEET = {
    title: 'September 2026',
    month: '2026-09-01',
    days: SEPTEMBER_HOURS.map(([day, minutes, commits]) => ({
        date: `2026-09-${String(day).padStart(2, '0')}`,
        minutes,
        commits,
        edited: day === SEPTEMBER_EDITED_DAY,
    })),
}

export const SAMPLE_PROFILE = {
    name: 'Alex Rivera',
    handle: 'alex-rivera',
    tagline: 'Full-stack developer',
    action: 'Ask Momi',
    shipped: [
        { title: 'Saved cards at checkout', area: 'Payments', date: 'Sep 29' },
        { title: 'Search that forgives typos', area: 'Search', date: 'Sep 24' },
        { title: 'Invoices you can download as PDF', area: 'Billing', date: 'Sep 17' },
    ],
} as const

export const SAMPLE_CHAT = {
    name: 'Alex',
    question: 'What did Alex ship this month?',
    answer: 'Three things reached customers in September: saved cards at checkout, search that forgives typos, and invoices you can download as PDF.',
    sources: ['Sep 17', 'Sep 24', 'Sep 29'],
    placeholder: 'Ask about Alex’s work…',
} as const

export const SAMPLE_STATS = [
    { value: '186', label: 'Commits' },
    { value: '21', label: 'Active days' },
    { value: '4', label: 'Projects' },
] as const

export const SAMPLE_WORK_MIX: Activity['kinds'] = [
    { kind: 'feature', commits: 74 },
    { kind: 'fix', commits: 41 },
    { kind: 'improvement', commits: 32 },
    { kind: 'docs', commits: 18 },
    { kind: 'tests', commits: 13 },
    { kind: 'maintenance', commits: 8 },
]

export const SAMPLE_ACTIVITY: DayCount[] = Array.from({ length: 26 * 7 }, (_, index) => ({
    date: shiftDay('2026-03-30', index),
    commits: index % 7 < 5 ? (index * 37 + 11) % 10 : index % 3 ? 0 : 2,
}))
