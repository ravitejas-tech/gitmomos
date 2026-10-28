import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { memberName } from '~/lib/community/member'
import { profilePath } from '~/lib/public-profile/handle'
import type { CommunityMember } from '~/types/community'

export function MemberName({ member }: { member: Pick<CommunityMember, 'name' | 'handle'> }) {
    if (!member.handle) {
        return (
            <Text
                as='span'
                variant='strong'
                truncate>
                {memberName(member)}
            </Text>
        )
    }

    return (
        <TextLink
            href={profilePath(member.handle)}
            variant='strong'
            hover='accent'
            active
            className='min-w-0'>
            {memberName(member)}
        </TextLink>
    )
}
