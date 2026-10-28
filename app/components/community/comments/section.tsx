import { CommentComposer } from '~/components/community/comments/form/composer'
import { CommentList } from '~/components/community/comments/list'
import { CommentSignInPrompt } from '~/components/community/comments/form/sign-in-prompt'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { useSession } from '~/hooks/auth/use-session'
import { useProfileComments, useProfileCommunity } from '~/hooks/community/queries'
import { pluralize } from '~/lib/format'
import type { PublicProfile } from '~/types/public-profile'

export function ProfileCommentsSection({ profile }: { profile: PublicProfile }) {
    const { session, isLoading } = useSession()
    const { data: community } = useProfileCommunity({ variables: profile.handle })
    const feed = useProfileComments({ variables: profile.handle })
    const canWrite = Boolean(community && !community.is_owner && !isLoading)

    return (
        <Card>
            <CardHeader
                title='Comments'
                description={community && pluralize(community.comments, 'comment')}
            />
            {canWrite && !session && <CommentSignInPrompt handle={profile.handle} />}
            {canWrite && session && (
                <CommentComposer
                    key={community?.my_comment ?? ''}
                    handle={profile.handle}
                    name={profile.name}
                    body={community?.my_comment ?? null}
                />
            )}
            <CommentList
                pages={feed.data?.pages}
                isError={feed.isError}
                onRetry={() => feed.refetch()}
                hasNextPage={feed.hasNextPage}
                isFetchingNextPage={feed.isFetchingNextPage}
                onLoadMore={() => feed.fetchNextPage()}
                owner={{ name: profile.name, avatarUrl: profile.avatar_url }}
                canModerate={community?.is_owner ?? false}
            />
        </Card>
    )
}
