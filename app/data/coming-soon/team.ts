export const TEAM = {
    name: 'Northwind web team',
    day: 'Friday, Oct 16',
    digest: 'Checkout had its biggest day yet: saved cards are live for internal accounts and refunds now handle partial orders. Mobile sign-in is more reliable, and the new job queue has alerting.',
} as const

export const TEAM_STATS = [
    { value: '4 / 4', label: 'reports in' },
    { value: 47, label: 'commits today' },
    { value: 3, label: 'projects moved' },
] as const

export const TEAM_MEMBERS = [
    { name: 'Alex Morgan', role: 'Full-stack', headline: 'Customers can now pay with a saved card', commits: 12 },
    { name: 'Priya Nair', role: 'Backend', headline: 'Refunds handle partial orders', commits: 15 },
    { name: 'Sam Lee', role: 'Mobile', headline: 'Mobile sign-in keeps you logged in', commits: 9 },
    { name: 'Jordan Kim', role: 'Infrastructure', headline: 'Background jobs are now monitored', commits: 11 },
] as const
