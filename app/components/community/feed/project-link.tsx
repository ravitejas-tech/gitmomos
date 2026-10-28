import { Text, type TextVariant } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { projectPath } from '~/lib/public-profile/handle'
import type { FeedEntryOf } from '~/types/community'

export interface FeedProjectLinkProps {
    handle: string | null
    project: FeedEntryOf<'project'>['project']
    variant: TextVariant
}

export function FeedProjectLink({ handle, project, variant }: FeedProjectLinkProps) {
    if (!handle) {
        return (
            <Text
                as='span'
                variant={variant}>
                {project.name}
            </Text>
        )
    }

    return (
        <TextLink
            href={projectPath(handle, project.slug)}
            variant={variant}
            hover='accent'
            active>
            {project.name}
        </TextLink>
    )
}
