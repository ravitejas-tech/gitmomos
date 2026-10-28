import { FeedHours } from '~/components/community/feed/hours'
import { FeedMilestone } from '~/components/community/feed/milestone'
import { FeedProject } from '~/components/community/feed/project'
import { FeedReport } from '~/components/community/feed/report'
import type { FeedUpdate } from '~/types/community'

export function FeedItem({ entry }: { entry: FeedUpdate }) {
    if (entry.kind === 'milestone') return <FeedMilestone entry={entry} />
    if (entry.kind === 'project') return <FeedProject entry={entry} />
    return entry.report ? (
        <FeedReport
            entry={entry}
            report={entry.report}
        />
    ) : (
        <FeedHours entry={entry} />
    )
}
