import { Timer } from 'lucide-react'
import { FeedCard } from '~/components/community/feed/card'
import { IconChip } from '~/components/ui/icon-chip'
import { formatDuration, pluralize } from '~/lib/format'
import type { FeedEntryOf } from '~/types/community'

export function FeedHours({ entry }: { entry: FeedEntryOf<'day'> }) {
    const { person, minutes, commits } = entry

    return (
        <FeedCard
            person={person}
            action={`worked ${formatDuration(minutes)}`}
            at={null}
            detail={commits > 0 ? pluralize(commits, 'commit') : undefined}
            badge={<IconChip icon={Timer} />}
        />
    )
}
