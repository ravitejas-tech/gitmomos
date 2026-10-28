import { FollowButton } from '~/components/community/follow-button'
import { MemberName } from '~/components/community/member-name'
import { Avatar } from '~/components/ui/avatar'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { memberName } from '~/lib/community/member'
import type { CommunityMember } from '~/types/community'

export interface PersonRowProps {
    member: CommunityMember
    detail: string
}

export function PersonRow({ member, detail }: PersonRowProps) {
    return (
        <ListRow>
            <Avatar
                name={memberName(member)}
                src={member.avatar_url}
                size='md'
            />
            <div className='flex min-w-0 flex-1 flex-col'>
                <MemberName member={member} />
                {detail && (
                    <Text
                        variant='caption'
                        truncate>
                        {detail}
                    </Text>
                )}
            </div>
            {member.handle && !member.is_self && (
                <FollowButton
                    handle={member.handle}
                    following={member.is_following}
                    size='sm'
                />
            )}
        </ListRow>
    )
}
