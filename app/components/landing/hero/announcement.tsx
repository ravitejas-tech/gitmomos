import { NavLink } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { LandingPill } from '~/components/landing/pill'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { HERO_ANNOUNCEMENT } from '~/data/landing/hero'

export function HeroAnnouncement() {
    const { badge, label, href } = HERO_ANNOUNCEMENT

    return (
        <NavLink
            to={href}
            className='group rounded-full'>
            <LandingPill className='pr-2.5 pl-1'>
                <Badge variant='accent'>{badge}</Badge>
                <Text
                    as='span'
                    variant='caption'
                    tone='secondary'>
                    {label}
                </Text>
                <ChevronRight className='size-3 text-text-muted transition-transform group-hover:translate-x-0.5' />
            </LandingPill>
        </NavLink>
    )
}
