import type { Activity } from '~/types/activity'

export const DIGEST_WEEK = {
    label: 'Week 42 · Oct 12 – 16',
    commits: 58,
    headline: 'Saved cards went live for internal accounts',
    summary:
        'A launch week for checkout. Saved cards were built, tested and switched on for internal accounts, payment confirmations stopped getting lost, and release 4.2 went out with a changelog.',
    areas: ['Payments', 'Reliability', 'Release 4.2'],
} as const

export const DIGEST_DAYS = [
    { day: 'Mon', headline: 'Tried out saving cards safely', commits: 11 },
    { day: 'Tue', headline: 'Clearer errors on the checkout form', commits: 9 },
    { day: 'Wed', headline: 'Payment confirmations retry on their own', commits: 14 },
    { day: 'Thu', headline: 'Background jobs are now monitored', commits: 12 },
    { day: 'Fri', headline: 'Customers can now pay with a saved card', commits: 12 },
] as const

export const DIGEST_KINDS: Activity['kinds'] = [
    { kind: 'feature', commits: 24 },
    { kind: 'fix', commits: 12 },
    { kind: 'improvement', commits: 9 },
    { kind: 'tests', commits: 7 },
    { kind: 'maintenance', commits: 4 },
    { kind: 'docs', commits: 2 },
]

export const DIGEST_MONTH = [
    { value: 214, label: 'commits in October' },
    { value: 12, label: 'daily reports' },
    { value: 4, label: 'projects moved' },
] as const
