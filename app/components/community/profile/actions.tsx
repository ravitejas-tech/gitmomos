import { FollowButton } from '~/components/community/follow-button'
import { StarButton } from '~/components/community/star-button'
import { useSession } from '~/hooks/auth/use-session'
import { useProfileCommunity } from '~/hooks/community/queries'
import { loginPath } from '~/lib/auth/login-path'
import { profilePath } from '~/lib/public-profile/handle'

export function ProfileCommunityActions({ handle }: { handle: string }) {
    const { session, isLoading } = useSession()
    const { data: community } = useProfileCommunity({ variables: handle })

    if (isLoading || !community || community.is_owner) return null

    const loginTo = session ? undefined : loginPath(profilePath(handle))
    return (
        <>
            <StarButton
                handle={handle}
                starred={community.is_starred}
                loginTo={loginTo}
            />
            <FollowButton
                handle={handle}
                following={community.is_following}
                loginTo={loginTo}
            />
        </>
    )
}
