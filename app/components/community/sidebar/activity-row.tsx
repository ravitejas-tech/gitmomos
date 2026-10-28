import { FollowButton } from '~/components/community/follow-button'
import { MemberName } from '~/components/community/member-name'
import { Avatar } from '~/components/ui/avatar'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { FEED_ACTIVITY } from '~/data/community/constants'
import { memberName } from '~/lib/community/member'
import { timeAgo } from '~/lib/format'
import type { FeedActivity } from '~/types/community'

export function ActivityRow({ entry }: { entry: FeedActivity }) {
    const { person, kind, at } = entry
    const { icon: Icon, action } = FEED_ACTIVITY[kind]

    return (
        <ListRow align='start'>
            <div className='relative shrink-0'>
                <Avatar
                    name={memberName(person)}
                    src={person.avatar_url}
                    size='base'
                />
                <span className='absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border border-border bg-surface'>
                    <Icon className='size-3 text-accent-text' />
                </span>
            </div>
            <div className='min-w-0 flex-1 space-y-0.5'>
                <Text as='div'>
                    <MemberName member={person} />{' '}
                    <Text
                        as='span'
                        tone='secondary'>
                        {action}
                    </Text>
                </Text>
                {entry.kind === 'comment' && (
                    <Text
                        variant='caption'
                        tone='secondary'
                        className='line-clamp-2'>
                        “{entry.body}”
                    </Text>
                )}
                <Text variant='caption'>{timeAgo(at)}</Text>
                {kind === 'follow' && person.handle && !person.is_following && (
                    <div className='pt-2'>
                        <FollowButton
                            handle={person.handle}
                            following={false}
                            size='sm'
                        />
                    </div>
                )}
            </div>
        </ListRow>
    )
}
