import { createQuery } from 'react-query-kit'
import { commitsService } from '~/services/commits.service'

export const useDayCommits = createQuery({
    queryKey: ['day-commits'],
    fetcher: (date: string) => commitsService.getDayCommits(date),
})

export const useRecentCommits = createQuery({
    queryKey: ['recent-commits'],
    fetcher: () => commitsService.getRecentCommits(),
})
