import { Badge } from '~/components/ui/badge'
import { NavPill } from '~/components/ui/nav-pill'
import { Text } from '~/components/ui/text'
import { formatReleaseDate, releasePath } from '~/lib/releases'
import type { GitHubRelease } from '~/types/releases'

export interface ReleaseVersionLinkProps {
    release: GitHubRelease
    isActive: boolean
    isLatest: boolean
    onSelect: () => void
}

export function ReleaseVersionLink({ release, isActive, isLatest, onSelect }: ReleaseVersionLinkProps) {
    return (
        <NavPill
            to={releasePath(release.tag_name)}
            active={isActive}
            onClick={onSelect}
            className='justify-between gap-2'>
            <Text
                as='span'
                variant='inherit'
                tone='inherit'
                className='flex items-center gap-2'>
                {release.tag_name}
                {isLatest && <Badge variant='accent'>Latest</Badge>}
            </Text>
            <Text
                as='span'
                variant='meta'
                className='shrink-0'>
                {formatReleaseDate(release.published_at, 'short')}
            </Text>
        </NavPill>
    )
}
