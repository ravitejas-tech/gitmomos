import { ExternalLink } from 'lucide-react'
import { CopyVersionButton } from '~/components/releases/copy-version-button'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { formatReleaseDate } from '~/lib/releases'
import type { GitHubRelease } from '~/types/releases'

export function ReleaseHeader({ release }: { release: GitHubRelease }) {
    const { name, tag_name, prerelease, published_at, author, html_url } = release

    return (
        <div className='mb-10 flex flex-col gap-6 border-b border-border pb-8'>
            <div>
                <div className='mb-4 flex items-center gap-2'>
                    <Text
                        variant='eyebrow'
                        tone='accent'>
                        Release notes
                    </Text>
                    {prerelease && <Badge variant='neutral'>Pre-release</Badge>}
                </div>
                <Text
                    as='h1'
                    variant='display'
                    tone='gradient'>
                    {name || tag_name}
                </Text>
                <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2'>
                    <Text
                        as='span'
                        tone='secondary'>
                        Released <time dateTime={published_at}>{formatReleaseDate(published_at, 'long')}</time>
                    </Text>
                    <span className='size-1 rounded-full bg-border-strong' />
                    <span className='flex items-center gap-2'>
                        <img
                            src={author.avatar_url}
                            alt=''
                            className='size-5 rounded-full border border-border'
                        />
                        <TextLink href={author.html_url}>{author.login}</TextLink>
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <CopyVersionButton tag={tag_name} />
                <Button
                    asChild
                    variant='secondary'
                    size='sm'>
                    <a
                        href={html_url}
                        target='_blank'
                        rel='noreferrer'>
                        View on GitHub
                        <ExternalLink />
                    </a>
                </Button>
            </div>
        </div>
    )
}
