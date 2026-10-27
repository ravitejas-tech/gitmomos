import { z } from 'zod'
import { DAY_MINUTES } from '~/data/timesheet/constants'

const timesheetDaySchema = z.object({
    date: z.string(),
    minutes: z.number(),
    commits: z.number(),
    edited: z.boolean(),
})

export const publicTimesheetSchema = z.array(timesheetDaySchema)

export const timesheetSchema = z.array(timesheetDaySchema.extend({ estimated: z.number() }))

export const timesheetHoursSchema = z
    .object({
        hours: z
            .number({ error: 'Enter the hours' })
            .int('Use whole hours')
            .min(0, 'Hours can’t be negative')
            .max(24, 'A day has 24 hours'),
        minutes: z
            .number({ error: 'Enter the minutes' })
            .int('Use whole minutes')
            .min(0, 'Minutes can’t be negative')
            .max(59, 'Use 0 to 59 minutes'),
    })
    .refine(({ hours, minutes }) => hours * 60 + minutes <= DAY_MINUTES, {
        path: ['hours'],
        error: 'A day has 24 hours',
    })

export type TimesheetHoursData = z.infer<typeof timesheetHoursSchema>
