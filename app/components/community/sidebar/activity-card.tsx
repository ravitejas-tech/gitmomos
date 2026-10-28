import { ActivityRow } from '~/components/community/sidebar/activity-row'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { SIDEBAR_ACTIVITY } from '~/data/community/constants'
import { useFeed } from '~/hooks/community/queries'
import { isActivity } from '~/lib/community/feed'

export function CommunityActivityCard() {
    const { data } = useFeed()
    const activity = data?.pages.flat().filter(isActivity).slice(0, SIDEBAR_ACTIVITY)

    if (!activity?.length) return null

    return (
        <Card>
            <CardHeader title='On your profile' />
            <ul className='divide-y divide-border border-t border-border'>
                {activity.map((entry) => (
                    <ActivityRow
                        key={entry.key}
                        entry={entry}
                    />
                ))}
            </ul>
        </Card>
    )
}
