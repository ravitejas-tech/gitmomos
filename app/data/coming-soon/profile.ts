export const PROFILE = {
    url: 'gitmomos.dev/@alexmorgan',
    name: 'Alex Morgan',
    role: 'Full-stack developer · Northwind',
} as const

export const PROFILE_HEATMAP = { start: '2026-04-19', days: 26 * 7 } as const

export const PROFILE_STATS = [
    { value: '1,284', label: 'commits this year' },
    { value: '23 days', label: 'longest streak' },
    { value: 6, label: 'projects' },
] as const

export const PROFILE_SHIPPED = [
    { date: 'Oct 16', title: 'Customers can now pay with a saved card' },
    { date: 'Oct 9', title: 'Release 4.2 is out, with a changelog' },
    { date: 'Oct 6', title: 'Faster search results on large catalogues' },
] as const
