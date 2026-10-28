import { ChevronRight, Medal } from 'lucide-react'
import { LinkTile } from '~/components/community/sidebar/link-tile'
import { Text } from '~/components/ui/text'
import { LEADERBOARD_PATH } from '~/data/navigation'
import { formatNumber, pluralize } from '~/lib/format'
import type { CommunityOverview } from '~/types/community'

export function RankLink({ community }: { community: CommunityOverview }) {
    return (
        <LinkTile
            to={LEADERBOARD_PATH}
            tone='outline'>
            <Medal className='size-5 shrink-0 text-accent-text' />
            <div className='min-w-0 flex-1'>
                <Text variant='strong'>
                    {community.rank
                        ? `#${formatNumber(community.rank)} of ${formatNumber(community.ranked)}`
                        : 'Leaderboard'}
                </Text>
                <Text
                    variant='caption'
                    truncate>
                    {community.commits === null
                        ? 'Make your profile public to join'
                        : `${pluralize(community.commits, 'commit')} all time`}
                </Text>
            </div>
            <ChevronRight className='size-4 shrink-0 text-text-muted' />
        </LinkTile>
    )
}
