import { Globe, Link2, Lock, Milestone } from 'lucide-react'
import { IconChip } from '~/components/ui/icon-chip'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { MetaItem } from '~/components/ui/meta-item'
import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { PROVIDER_ICONS } from '~/data/connections/constants'
import { useRepositories } from '~/hooks/connections/queries'
import { hostOf } from '~/lib/url'
import type { Project } from '~/types/projects'

export function ProjectAboutCard({ project }: { project: Project }) {
    const { data: repositories } = useRepositories()
    const included = repositories?.filter(({ id }) => project.repository_ids.includes(id)) ?? []

    return (
        <Card>
            <CardHeader title='About' />
            <CardContent className='space-y-5'>
                {project.description && <Text tone='secondary'>{project.description}</Text>}
                <div className='flex flex-col gap-2'>
                    <MetaItem icon={project.is_public ? Globe : Lock}>
                        {project.is_public ? 'Shown on your profile' : 'Only you can see it'}
                    </MetaItem>
                    <MetaItem icon={Milestone}>
                        {project.tracks_milestones ? 'Finding milestones' : 'Milestones off'}
                    </MetaItem>
                    {project.url && (
                        <MetaItem icon={Link2}>
                            <TextLink
                                href={project.url}
                                variant='caption'
                                hover='accent'>
                                {hostOf(project.url)}
                            </TextLink>
                        </MetaItem>
                    )}
                </div>
                <ul className='space-y-2'>
                    {included.map((repository) => (
                        <li
                            key={repository.id}
                            className='flex items-center gap-3'>
                            <IconChip icon={PROVIDER_ICONS[repository.connection.provider]} />
                            <Text
                                variant='strong'
                                truncate>
                                {repository.full_name}
                            </Text>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
