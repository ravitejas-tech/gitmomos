import { MONTH_PATTERN } from '~/data/timesheet/constants'

export function monthFromParam(value: string | null, max: string): string {
    const month = value && MONTH_PATTERN.test(value) ? `${value}-01` : max
    return month < max ? month : max
}

export function monthParam(month: string): string {
    return month.slice(0, 7)
}
