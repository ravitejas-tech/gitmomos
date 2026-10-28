import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { profilePath } from '~/lib/public-profile/handle'
import { hostOf } from '~/lib/url'
import type { PublicProject } from '~/types/projects'

export function PublicProjectHeader({ project }: { project: PublicProject }) {
    return (
        <header className='space-y-5'>
            <TextLink
                href={profilePath(project.handle)}
                variant='caption'>
                <ArrowLeft className='size-4' />
                {project.owner}
            </TextLink>
            <div className='space-y-2'>
                <Text
                    as='h1'
                    variant='document-title'>
                    {project.name}
                </Text>
                {project.description && (
                    <Text
                        variant='lead'
                        tone='secondary'>
                        {project.description}
                    </Text>
                )}
            </div>
            {project.url && (
                <Button
                    asChild
                    variant='secondary'>
                    <a
                        href={project.url}
                        target='_blank'
                        rel='noreferrer'>
                        <ExternalLink />
                        {hostOf(project.url)}
                    </a>
                </Button>
            )}
        </header>
    )
}
