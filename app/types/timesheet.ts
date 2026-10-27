import type { z } from 'zod'
import type { publicTimesheetSchema, timesheetSchema } from '~/schemas/timesheet.schema'
import type { DayRange } from '~/types/activity'
import type { CalendarDay } from '~/types/calendar'

export type TimesheetDay = z.infer<typeof publicTimesheetSchema>[number]
export type OwnTimesheetDay = z.infer<typeof timesheetSchema>[number]
export type TimesheetCell = CalendarDay & Pick<TimesheetDay, 'minutes' | 'commits' | 'edited'>
export type PublicTimesheetQuery = DayRange & { handle: string }

export interface TimesheetEntry {
    date: string
    minutes: number
}

export interface TimesheetWeek {
    days: TimesheetCell[]
    minutes: number
}

export interface TimesheetTotals {
    minutes: number
    days: number
}
