import { FollowButton } from '~/components/community/follow-button'
import { MemberName } from '~/components/community/member-name'
import { RankMedal } from '~/components/leaderboard/medal'
import { Avatar } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { ListRow } from '~/components/ui/list-row'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { memberName } from '~/lib/community/member'
import { formatNumber } from '~/lib/format'
import { shareOf } from '~/lib/leaderboard/medal'
import type { LeaderboardEntry } from '~/types/leaderboard'

export interface LeaderboardRowProps {
    entry: LeaderboardEntry
    leaderCommits: number
    className?: string
}

export function LeaderboardRow({ entry, leaderCommits, className }: LeaderboardRowProps) {
    return (
        <ListRow
            tone={entry.is_self ? 'highlight' : 'default'}
            className={className}>
            <div className='flex w-10 shrink-0 justify-center'>
                <RankMedal rank={entry.rank} />
            </div>
            <Avatar
                name={memberName(entry)}
                src={entry.avatar_url}
                size='base'
            />
            <div className='flex min-w-0 flex-1 flex-col'>
                <div className='flex min-w-0 items-center gap-1.5'>
                    <MemberName member={entry} />
                    {entry.is_self && <Badge variant='accent'>You</Badge>}
                </div>
                <Text
                    variant='caption'
                    truncate>
                    {[entry.handle && `@${entry.handle}`, entry.tagline].filter(Boolean).join(' · ')}
                </Text>
            </div>
            <ProgressBar
                value={shareOf(entry.commits, leaderCommits)}
                className='w-40 shrink-0 max-lg:hidden'
            />
            <Text
                variant='strong'
                numeric
                className='w-20 shrink-0 text-right'>
                {formatNumber(entry.commits)}
            </Text>
            <div className='flex w-28 shrink-0 justify-end max-sm:hidden'>
                {entry.handle && !entry.is_self && (
                    <FollowButton
                        handle={entry.handle}
                        following={entry.is_following}
                        size='sm'
                    />
                )}
            </div>
        </ListRow>
    )
}
