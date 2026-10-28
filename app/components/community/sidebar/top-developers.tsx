import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { MemberName } from '~/components/community/member-name'
import { RankMedal } from '~/components/leaderboard/medal'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { ListRow } from '~/components/ui/list-row'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { SIDEBAR_LEADERS } from '~/data/leaderboard/constants'
import { LEADERBOARD_PATH } from '~/data/navigation'
import { useLeaderboard } from '~/hooks/leaderboard/queries'
import { memberName } from '~/lib/community/member'
import { formatNumber } from '~/lib/format'

export function TopDevelopersCard() {
    const { data } = useLeaderboard()
    const leaders = data?.pages[0]?.people.slice(0, SIDEBAR_LEADERS)

    return (
        <Card>
            <CardHeader
                title='Top developers'
                description='All-time commits'
                actions={
                    <Button
                        asChild
                        variant='ghost'
                        size='sm'>
                        <Link to={LEADERBOARD_PATH}>
                            Leaderboard
                            <ArrowRight />
                        </Link>
                    </Button>
                }
            />
            {!leaders && <Skeleton className='mx-5 mb-5 h-40' />}
            {leaders && (
                <ul className='divide-y divide-border border-t border-border'>
                    {leaders.map((entry) => (
                        <ListRow
                            key={entry.handle ?? entry.rank}
                            tone={entry.is_self ? 'highlight' : 'default'}>
                            <RankMedal rank={entry.rank} />
                            <Avatar
                                name={memberName(entry)}
                                src={entry.avatar_url}
                                size='md'
                            />
                            <div className='flex min-w-0 flex-1'>
                                <MemberName member={entry} />
                            </div>
                            <Text
                                variant='strong'
                                numeric>
                                {formatNumber(entry.commits)}
                            </Text>
                        </ListRow>
                    ))}
                </ul>
            )}
        </Card>
    )
}
