import type { ReactNode } from 'react'
import { LandingPill } from '~/components/landing/pill'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'

export interface LandingBadgePillProps {
    badge: string
    label: string
    children?: ReactNode
}

export function LandingBadgePill({ badge, label, children }: LandingBadgePillProps) {
    return (
        <LandingPill className='pr-2.5 pl-1'>
            <Badge variant='accent'>{badge}</Badge>
            <Text
                as='span'
                variant='caption'
                tone='secondary'>
                {label}
            </Text>
            {children}
        </LandingPill>
    )
}
