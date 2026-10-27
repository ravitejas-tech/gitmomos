export const MONTH_PARAM = 'month'
export const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/
export const NO_WORK = { minutes: 0, commits: 0, estimated: 0, edited: false } as const
export const TIMESHEET_NOTE = 'Hours estimated from commit times'
export const DAY_MINUTES = 24 * 60
export const EDITED_DOT = 'bg-warning'
export const EDITED_LEGEND = [{ dot: EDITED_DOT, label: 'Edited by hand' }] as const
