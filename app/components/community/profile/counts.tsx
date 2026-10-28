import { Star, UsersRound } from 'lucide-react'
import { MetaItem } from '~/components/ui/meta-item'
import { useProfileCommunity } from '~/hooks/community/queries'
import { pluralize } from '~/lib/format'

export function ProfileCommunityCounts({ handle }: { handle: string }) {
    const { data: community } = useProfileCommunity({ variables: handle })
    if (!community) return null

    return (
        <>
            <MetaItem icon={UsersRound}>{pluralize(community.followers, 'follower')}</MetaItem>
            <MetaItem icon={Star}>{pluralize(community.stars, 'star')}</MetaItem>
        </>
    )
}
