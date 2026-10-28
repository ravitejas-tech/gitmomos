import { Crown, TrendingUp } from 'lucide-react'
import { Avatar } from '~/components/ui/avatar'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { useCommunity } from '~/hooks/community/queries'
import { useProfile } from '~/hooks/profile/queries'
import { memberName } from '~/lib/community/member'
import { formatNumber, pluralize } from '~/lib/format'
import { shareOf } from '~/lib/leaderboard/medal'

export function LeaderboardStanding() {
    const { data: profile } = useProfile()
    const { data: community } = useCommunity()

    if (!community) return <Skeleton className='h-28' />
    if (!community.rank || community.commits === null) return null

    const { rank, commits, ranked, ahead } = community
    const name = memberName({ name: profile?.full_name?.trim() || null, handle: profile?.handle ?? null })

    return (
        <Card
            tone='highlight'
            padding='lg'
            className='flex flex-col gap-6 md:flex-row md:items-center'>
            <div className='flex items-center gap-4'>
                <Avatar
                    name={name}
                    src={profile?.avatar_url}
                    size='lg'
                />
                <div>
                    <Text variant='caption'>Your rank</Text>
                    <Text
                        variant='page-title'
                        numeric>
                        #{formatNumber(rank)}
                        <Text
                            as='span'
                            variant='body'
                            tone='muted'>
                            {' '}
                            of {formatNumber(ranked)}
                        </Text>
                    </Text>
                </div>
            </div>
            <div className='min-w-0 flex-1 space-y-2 md:border-l md:border-border md:pl-6'>
                <div className='flex items-center gap-2'>
                    <IconChip
                        icon={ahead ? TrendingUp : Crown}
                        tone='accent'
                    />
                    <Text variant='strong'>
                        {ahead
                            ? `${pluralize(ahead.commits - commits, 'commit')} behind ${memberName(ahead)} at #${ahead.rank}`
                            : 'You’re leading the board'}
                    </Text>
                </div>
                {ahead && <ProgressBar value={shareOf(commits, ahead.commits)} />}
            </div>
            <div className='md:text-right'>
                <Text
                    variant='stat'
                    numeric>
                    {formatNumber(commits)}
                </Text>
                <Text variant='caption'>commits all time</Text>
            </div>
        </Card>
    )
}
