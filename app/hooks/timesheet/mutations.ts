import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { usePublicTimesheet, useTimesheet } from '~/hooks/timesheet/queries'
import { queryClient } from '~/services/query-client'
import { timesheetService } from '~/services/timesheet.service'

const refreshTimesheets = () => {
    for (const key of [useTimesheet.getKey(), usePublicTimesheet.getKey()]) {
        queryClient.invalidateQueries({ queryKey: key })
    }
}

export const useSaveTimesheetEntry = createMutation({
    mutationFn: timesheetService.saveEntry,
    onSuccess: () => {
        toast.success('Hours saved')
        refreshTimesheets()
    },
    onError: (error) => toast.error(error.message),
})

export const useResetTimesheetEntry = createMutation({
    mutationFn: timesheetService.resetEntry,
    onSuccess: () => {
        toast.success('Hours reset to the estimate')
        refreshTimesheets()
    },
    onError: (error) => toast.error(error.message),
})
