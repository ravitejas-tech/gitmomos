import { FollowButton } from '~/components/community/follow-button'
import { MemberName } from '~/components/community/member-name'
import { Avatar } from '~/components/ui/avatar'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { memberName } from '~/lib/community/member'
import type { Person } from '~/types/community'

export interface PersonCardProps {
    person: Person
    since: string
}

export function PersonCard({ person, since }: PersonCardProps) {
    return (
        <Card
            padding='md'
            className='flex items-start gap-3'>
            <Avatar
                name={memberName(person)}
                src={person.avatar_url}
                size='lg'
            />
            <div className='min-w-0 flex-1 space-y-0.5'>
                <MemberName member={person} />
                <Text
                    variant='caption'
                    truncate>
                    {person.handle ? `@${person.handle}` : since}
                </Text>
                {person.tagline && (
                    <Text
                        tone='secondary'
                        className='line-clamp-2'>
                        {person.tagline}
                    </Text>
                )}
                {person.handle && <Text variant='caption'>{since}</Text>}
            </div>
            {person.handle && !person.is_self && (
                <FollowButton
                    handle={person.handle}
                    following={person.is_following}
                    size='sm'
                />
            )}
        </Card>
    )
}
