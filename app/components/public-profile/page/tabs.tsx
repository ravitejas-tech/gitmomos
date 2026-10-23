import { NavPill } from '~/components/ui/nav-pill'
import { profileTabs } from '~/data/public-profile/tabs'

export interface ProfileTabsProps {
    handle: string
    active: string
}

export function ProfileTabs({ handle, active }: ProfileTabsProps) {
    return (
        <nav
            aria-label='Profile sections'
            className='flex gap-1 border-b border-border pb-3'>
            {profileTabs(handle).map(({ key, label, to }) => (
                <NavPill
                    key={key}
                    to={to}
                    active={key === active}>
                    {label}
                </NavPill>
            ))}
        </nav>
    )
}
