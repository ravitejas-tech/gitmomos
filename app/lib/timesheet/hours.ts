import type { TimesheetHoursData } from '~/schemas/timesheet.schema'

export function splitMinutes(total: number): TimesheetHoursData {
    return { hours: Math.floor(total / 60), minutes: total % 60 }
}

export function joinMinutes({ hours, minutes }: TimesheetHoursData): number {
    return hours * 60 + minutes
}
