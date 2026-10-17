import type { Activity } from '~/types/activity'

export const STATS_CARD_README = {
    path: 'alexmorgan / README.md',
    greeting: 'Hi, I’m Alex',
    intro: 'Full-stack developer building checkout at Northwind.',
} as const

export const STATS_CARD_PERIOD = 'This week'

export const STATS_CARD_STATS = [
    { value: 64, label: 'commits' },
    { value: 12, label: 'day streak' },
    { value: '5 / 5', label: 'days active' },
] as const

export const STATS_CARD_KINDS: Activity['kinds'] = [
    { kind: 'feature', commits: 27 },
    { kind: 'fix', commits: 15 },
    { kind: 'improvement', commits: 11 },
    { kind: 'tests', commits: 7 },
    { kind: 'docs', commits: 4 },
]

export const STATS_CARD_FOCUS = 'Focus: Payments · Reliability'

export const STATS_CARD_EMBED = '![My week on gitmomos](https://gitmomos.spheo.online/card/alexmorgan.svg)'

export const STATS_CARD_THEMES = ['Auto', 'Light', 'Dark'] as const
