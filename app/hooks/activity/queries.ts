import { createQuery } from 'react-query-kit'
import { activityService } from '~/services/activity.service'
import type { DayRange } from '~/types/activity'

export const useActivity = createQuery({
    queryKey: ['activity'],
    fetcher: (range: DayRange) => activityService.getActivity(range),
})
