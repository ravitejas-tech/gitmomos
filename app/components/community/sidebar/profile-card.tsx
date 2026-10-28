import { RankLink } from '~/components/community/sidebar/rank-link'
import { StatLink } from '~/components/community/sidebar/stat-link'
import { MemberName } from '~/components/community/member-name'
import { ProfileBanner } from '~/components/public-profile/banner'
import { Avatar } from '~/components/ui/avatar'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { COMMUNITY_STATS } from '~/data/community/stats'
import { useCommunity } from '~/hooks/community/queries'
import { useProfile } from '~/hooks/profile/queries'
import { memberName } from '~/lib/community/member'

export function CommunityProfileCard() {
    const { data: profile } = useProfile()
    const { data: community } = useCommunity()
    const member = {
        name: profile?.full_name?.trim() || null,
        handle: profile?.is_public ? profile.handle : null,
    }

    return (
        <Card>
            <ProfileBanner
                src={profile?.banner_url ?? null}
                size='strip'
            />
            <div className='px-5 pb-5'>
                <Avatar
                    name={memberName(member)}
                    src={profile?.avatar_url}
                    size='profile'
                    className='relative -mt-8'
                />
                <div className='mt-2 space-y-0.5'>
                    <MemberName member={member} />
                    <Text
                        variant='caption'
                        truncate>
                        {member.handle ? `@${member.handle}` : 'Private profile'}
                    </Text>
                    {profile?.tagline && (
                        <Text
                            tone='secondary'
                            className='line-clamp-2 pt-1'>
                            {profile.tagline}
                        </Text>
                    )}
                </div>
                <div className='-mx-3 mt-4 grid grid-cols-4'>
                    {COMMUNITY_STATS.map(({ count, label, to }) => (
                        <StatLink
                            key={count}
                            to={to}
                            label={label}
                            value={community?.[count]}
                        />
                    ))}
                </div>
                <div className='mt-4'>
                    {community ? <RankLink community={community} /> : <Skeleton className='h-14' />}
                </div>
            </div>
        </Card>
    )
}
