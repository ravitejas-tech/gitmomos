import { Flag, FolderKanban } from 'lucide-react'
import { FeedCard } from '~/components/community/feed/card'
import { FeedProjectLink } from '~/components/community/feed/project-link'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import type { FeedEntryOf } from '~/types/community'

export function FeedMilestone({ entry }: { entry: FeedEntryOf<'milestone'> }) {
    const { person, project, title, detail } = entry

    return (
        <FeedCard
            person={person}
            action='reached a milestone'
            at={null}
            highlight
            badge={
                <Badge
                    variant='accent'
                    className='shrink-0'>
                    <Flag className='size-3' />
                    Milestone
                </Badge>
            }>
            <Text variant='heading'>{title}</Text>
            {detail && <Text tone='secondary'>{detail}</Text>}
            <div className='flex items-center gap-1.5'>
                <FolderKanban className='size-4 text-text-muted' />
                <FeedProjectLink
                    handle={person.handle}
                    project={project}
                    variant='caption-strong'
                />
            </div>
        </FeedCard>
    )
}
