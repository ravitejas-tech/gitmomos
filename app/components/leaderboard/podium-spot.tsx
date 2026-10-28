import { cva } from 'class-variance-authority'
import { Crown } from 'lucide-react'
import { FollowButton } from '~/components/community/follow-button'
import { MemberName } from '~/components/community/member-name'
import { Pedestal } from '~/components/leaderboard/pedestal'
import { Avatar } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { memberName } from '~/lib/community/member'
import { formatNumber } from '~/lib/format'
import { medalFor } from '~/lib/leaderboard/medal'
import type { LeaderboardEntry, PodiumPlace } from '~/types/leaderboard'

const ringVariants = cva('rounded-full p-1 ring-2', {
    variants: {
        medal: {
            gold: 'ring-medal-gold',
            silver: 'ring-medal-silver',
            bronze: 'ring-medal-bronze',
        },
    },
})

export interface PodiumSpotProps {
    entry: LeaderboardEntry
    place: PodiumPlace
    gap: string | null
}

export function PodiumSpot({ entry, place, gap }: PodiumSpotProps) {
    const medal = medalFor(entry.rank) ?? 'bronze'

    return (
        <div className='flex max-w-60 min-w-0 flex-1 basis-0 flex-col items-center text-center'>
            {entry.rank === 1 && <Crown className='mb-2 size-7 fill-medal-gold-subtle text-medal-gold' />}
            <div className={ringVariants({ medal })}>
                <Avatar
                    name={memberName(entry)}
                    src={entry.avatar_url}
                    size={place === 1 ? 'leader' : 'podium'}
                />
            </div>
            <div className='mt-3 flex w-full min-w-0 flex-col items-center gap-0.5 px-2'>
                <div className='flex max-w-full items-center gap-1.5'>
                    <MemberName member={entry} />
                    {entry.is_self && <Badge variant='accent'>You</Badge>}
                </div>
                <Text
                    variant='caption'
                    truncate
                    className='max-w-full'>
                    {entry.handle ? `@${entry.handle}` : entry.tagline}
                </Text>
            </div>
            <div className='mt-3 flex items-baseline gap-1.5'>
                <Text
                    variant='heading'
                    numeric>
                    {formatNumber(entry.commits)}
                </Text>
                <Text
                    as='span'
                    variant='caption'>
                    commits
                </Text>
            </div>
            {gap && <Text variant='caption'>{gap}</Text>}
            {entry.handle && !entry.is_self && (
                <div className='mt-3'>
                    <FollowButton
                        handle={entry.handle}
                        following={entry.is_following}
                        size='sm'
                    />
                </div>
            )}
            <Pedestal
                tone={medal}
                place={place}
                rank={entry.rank}
            />
        </div>
    )
}
