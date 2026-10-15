import { ReleaseVersionLink } from '~/components/releases/release-version-link'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { GitHubRelease } from '~/types/releases'

export interface ReleaseSidebarProps {
    releases: readonly GitHubRelease[]
    selectedTag: string
    isOpen: boolean
    onSelect: () => void
}

export function ReleaseSidebar({ releases, selectedTag, isOpen, onSelect }: ReleaseSidebarProps) {
    return (
        <aside className={cn('w-full shrink-0 lg:sticky lg:top-24 lg:block lg:w-56', isOpen ? 'block' : 'hidden')}>
            <div className='rounded-lg border border-border bg-surface p-3 lg:border-none lg:bg-transparent lg:p-0'>
                <Text
                    variant='eyebrow'
                    className='mb-2 px-2'>
                    Versions
                </Text>
                <nav className='flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto lg:max-h-[calc(100vh-10rem)]'>
                    {releases.map((release, index) => (
                        <ReleaseVersionLink
                            key={release.id}
                            release={release}
                            isActive={release.tag_name === selectedTag}
                            isLatest={index === 0}
                            onSelect={onSelect}
                        />
                    ))}
                </nav>
            </div>
        </aside>
    )
}
