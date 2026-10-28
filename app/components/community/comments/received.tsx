import { CommentList } from '~/components/community/comments/list'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { useCommunity, useReceivedComments } from '~/hooks/community/queries'
import { useProfile } from '~/hooks/profile/queries'
import { memberName } from '~/lib/community/member'
import { pluralize } from '~/lib/format'

export function ReceivedComments() {
    const { data: profile } = useProfile()
    const { data: counts } = useCommunity()
    const feed = useReceivedComments()
    const ownerName = memberName({ name: profile?.full_name?.trim() || null, handle: profile?.handle ?? null })

    return (
        <Card>
            <CardHeader
                title='Comments on your profile'
                description={counts && pluralize(counts.comments, 'comment')}
            />
            <CommentList
                pages={feed.data?.pages}
                isError={feed.isError}
                onRetry={() => feed.refetch()}
                hasNextPage={feed.hasNextPage}
                isFetchingNextPage={feed.isFetchingNextPage}
                onLoadMore={() => feed.fetchNextPage()}
                owner={{ name: ownerName, avatarUrl: profile?.avatar_url ?? null }}
                canModerate
            />
        </Card>
    )
}
