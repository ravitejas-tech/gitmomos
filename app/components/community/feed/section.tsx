import { Rss } from 'lucide-react'
import { FeedItem } from '~/components/community/feed/item'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadMoreFooter } from '~/components/ui/load-more-footer'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { LOADING_ROWS } from '~/data/public-profile/constants'
import { useCommunity, useFeed } from '~/hooks/community/queries'
import { feedDayLabel, groupFeedByDay, isUpdate } from '~/lib/community/feed'

export function FeedSection() {
    const { data: community } = useCommunity()
    const { data, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useFeed()
    const updates = data?.pages.flat().filter(isUpdate)

    if (isError) return <ErrorState onRetry={() => refetch()} />

    if (!updates) {
        return (
            <div className='space-y-4'>
                {LOADING_ROWS.map((row) => (
                    <Skeleton
                        key={row}
                        className='h-44'
                    />
                ))}
            </div>
        )
    }

    return (
        <div className='space-y-8'>
            {updates.length === 0 && (
                <EmptyState
                    icon={Rss}
                    title={community?.following ? 'No recent updates' : 'Your feed is empty'}
                    description={
                        community?.following
                            ? 'Reports, hours, milestones and projects from people you follow show up here.'
                            : 'Follow developers to see their reports, hours, milestones and new projects here.'
                    }
                />
            )}
            {groupFeedByDay(updates).map((day) => (
                <section
                    key={day.date}
                    className='space-y-4'>
                    <div className='flex items-center gap-3'>
                        <Text
                            as='h3'
                            variant='label'>
                            {feedDayLabel(day.date)}
                        </Text>
                        <div className='h-px flex-1 bg-border' />
                    </div>
                    {day.entries.map((entry) => (
                        <FeedItem
                            key={entry.key}
                            entry={entry}
                        />
                    ))}
                </section>
            ))}
            {hasNextPage && (
                <LoadMoreFooter
                    label='Show earlier updates'
                    isLoading={isFetchingNextPage}
                    onLoadMore={() => fetchNextPage()}
                    framed={false}
                />
            )}
        </div>
    )
}
