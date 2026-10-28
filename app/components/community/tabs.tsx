import { Badge } from '~/components/ui/badge'
import { NavPill } from '~/components/ui/nav-pill'
import { COMMENTS_TAB, COMMUNITY_TABS } from '~/data/community/constants'
import { useCommunity } from '~/hooks/community/queries'
import { communityTabPath } from '~/lib/community/paths'

export function CommunityTabs({ active }: { active: string }) {
    const { data: community } = useCommunity()

    return (
        <nav
            aria-label='Community sections'
            className='flex gap-1 overflow-x-auto border-b border-border pb-3'>
            {COMMUNITY_TABS.map(({ key, label }) => (
                <NavPill
                    key={key}
                    to={communityTabPath(key)}
                    active={key === active}
                    className='shrink-0 gap-2'>
                    {label}
                    {key === COMMENTS_TAB && !!community?.comments && (
                        <Badge variant='accent'>{community.comments}</Badge>
                    )}
                </NavPill>
            ))}
        </nav>
    )
}
