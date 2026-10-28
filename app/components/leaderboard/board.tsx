import { Medal } from 'lucide-react'
import { LeaderboardPodium } from '~/components/leaderboard/podium'
import { LeaderboardRow } from '~/components/leaderboard/row'
import { Card } from '~/components/ui/card'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadMoreFooter } from '~/components/ui/load-more-footer'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { PODIUM_SIZE } from '~/data/leaderboard/constants'
import { useLeaderboard } from '~/hooks/leaderboard/queries'

export function LeaderboardBoard() {
    const { data, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useLeaderboard()
    const people = data?.pages.flatMap((page) => page.people)

    if (isError) return <ErrorState onRetry={() => refetch()} />
    if (!people) return <Skeleton className='h-96' />
    if (!people.length) {
        return (
            <EmptyState
                icon={Medal}
                title='No one on the leaderboard yet'
            />
        )
    }

    return (
        <div className='space-y-6'>
            <LeaderboardPodium leaders={people.slice(0, PODIUM_SIZE)} />
            <Card className={people.length <= PODIUM_SIZE ? 'md:hidden' : undefined}>
                <div className='flex items-center gap-3 border-b border-border px-5 py-3'>
                    <Text
                        variant='label'
                        className='w-10 shrink-0 text-center'>
                        Rank
                    </Text>
                    <Text
                        variant='label'
                        className='flex-1'>
                        Developer
                    </Text>
                    <Text
                        variant='label'
                        className='w-20 shrink-0 text-right'>
                        Commits
                    </Text>
                    <span className='w-28 shrink-0 max-sm:hidden' />
                </div>
                <ul className='divide-y divide-border'>
                    {people.map((entry, index) => (
                        <LeaderboardRow
                            key={entry.handle ?? entry.rank}
                            entry={entry}
                            leaderCommits={people[0]?.commits ?? 0}
                            className={index < PODIUM_SIZE ? 'md:hidden' : undefined}
                        />
                    ))}
                </ul>
                {hasNextPage && (
                    <LoadMoreFooter
                        label='Show more developers'
                        isLoading={isFetchingNextPage}
                        onLoadMore={() => fetchNextPage()}
                    />
                )}
            </Card>
        </div>
    )
}
