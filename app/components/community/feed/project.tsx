import { FolderKanban } from 'lucide-react'
import { FeedCard } from '~/components/community/feed/card'
import { FeedProjectLink } from '~/components/community/feed/project-link'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'
import type { FeedEntryOf } from '~/types/community'

export function FeedProject({ entry }: { entry: FeedEntryOf<'project'> }) {
    const { person, project, description, at } = entry

    return (
        <FeedCard
            person={person}
            action='published a new project'
            at={at}
            badge={
                <Badge
                    variant='success'
                    className='shrink-0'>
                    New project
                </Badge>
            }>
            <Card
                tone='subtle'
                padding='md'
                className='flex items-start gap-3'>
                <IconChip
                    icon={FolderKanban}
                    tone='accent'
                    size='md'
                />
                <div className='min-w-0 flex-1 space-y-0.5'>
                    <FeedProjectLink
                        handle={person.handle}
                        project={project}
                        variant='subheading'
                    />
                    {description && (
                        <Text
                            tone='secondary'
                            className='line-clamp-2'>
                            {description}
                        </Text>
                    )}
                </div>
            </Card>
        </FeedCard>
    )
}
