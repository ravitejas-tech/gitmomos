import type { ProfileStats } from '~/types/public-profile'

export const trackRecordStats = (stats: ProfileStats) => [
    { value: stats.active_days.toLocaleString(), label: 'Days shipped this year' },
    { value: stats.projects.toLocaleString(), label: 'Projects' },
    { value: stats.reports.toLocaleString(), label: 'Reports shared' },
]
