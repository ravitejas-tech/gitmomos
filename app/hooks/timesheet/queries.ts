import { createQuery } from 'react-query-kit'
import { timesheetService } from '~/services/timesheet.service'
import type { DayRange } from '~/types/activity'
import type { PublicTimesheetQuery } from '~/types/timesheet'

export const useTimesheet = createQuery({
    queryKey: ['timesheet'],
    fetcher: (range: DayRange) => timesheetService.getTimesheet(range),
})

export const usePublicTimesheet = createQuery({
    queryKey: ['public-timesheet'],
    fetcher: (query: PublicTimesheetQuery) => timesheetService.getPublicTimesheet(query),
})
