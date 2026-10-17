export const TIMESHEET_WEEK = {
    title: 'Week of Oct 12',
    description: 'Northwind · estimated from your commit sessions',
} as const

export const TIMESHEET_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const

export const TIMESHEET_COLUMNS = ['Project', ...TIMESHEET_DAYS, 'Total'] as const

export const TIMESHEET_ROWS = [
    { project: 'checkout', hours: [3.5, 4, 2.5, 5, 3] },
    { project: 'api', hours: [2, 1.5, 3, 1, 2.5] },
    { project: 'infra', hours: [0, 1, 0.5, 1.5, 0] },
    { project: 'web', hours: [1.5, 0.5, 1, 0, 1.5] },
] as const
