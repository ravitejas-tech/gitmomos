import { createInfiniteQuery } from 'react-query-kit'
import { leaderboardService } from '~/services/leaderboard.service'

export const useLeaderboard = createInfiniteQuery({
    queryKey: ['leaderboard'],
    fetcher: (_: void, { pageParam }) => leaderboardService.getLeaderboard(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
        const loaded = pages.reduce((count, page) => count + page.people.length, 0)
        return loaded < lastPage.total ? loaded : undefined
    },
})
