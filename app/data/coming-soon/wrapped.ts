import { CalendarDays, Flame, Moon } from 'lucide-react'
import type { Activity } from '~/types/activity'

export const WRAPPED_YEAR = '2026'
export const WRAPPED_COMMITS = '2,431'
export const WRAPPED_PROJECTS = 6

export const WRAPPED_HIGHLIGHTS = [
    { label: 'Top project', value: 'checkout' },
    { label: 'Best streak', value: '23 days' },
    { label: 'Active days', value: '214' },
] as const

export const WRAPPED_MOMENTS = [
    {
        icon: Moon,
        eyebrow: 'Your coding personality',
        title: 'Night owl',
        detail: '38% of your commits landed after 9 PM.',
    },
    { icon: CalendarDays, eyebrow: 'Busiest day', title: 'Tuesdays', detail: '412 commits, more than any other day.' },
    { icon: Flame, eyebrow: 'Biggest month', title: 'March', detail: '318 commits while saved cards were built.' },
] as const

export const WRAPPED_KINDS: Activity['kinds'] = [
    { kind: 'feature', commits: 997 },
    { kind: 'fix', commits: 486 },
    { kind: 'improvement', commits: 389 },
    { kind: 'maintenance', commits: 243 },
    { kind: 'tests', commits: 194 },
    { kind: 'docs', commits: 122 },
]
