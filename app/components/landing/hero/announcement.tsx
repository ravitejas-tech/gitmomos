import { NavLink } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { BadgePill } from '~/components/ui/badge-pill'
import { HERO_ANNOUNCEMENT } from '~/data/landing/hero'

export function HeroAnnouncement() {
    const { badge, label, href } = HERO_ANNOUNCEMENT

    return (
        <NavLink
            to={href}
            className='group rounded-full'>
            <BadgePill
                badge={badge}
                label={label}>
                <ChevronRight className='size-3 text-text-muted transition-transform group-hover:translate-x-0.5' />
            </BadgePill>
        </NavLink>
    )
}
