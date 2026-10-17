import type { LucideIcon } from 'lucide-react'
import { LandingPill } from '~/components/landing/pill'
import { Text } from '~/components/ui/text'

export interface LandingIconPillProps {
    icon: LucideIcon
    label: string
}

export function LandingIconPill({ icon: Icon, label }: LandingIconPillProps) {
    return (
        <LandingPill>
            <Icon className='size-3.5 text-accent-text' />
            <Text
                as='span'
                variant='caption'
                tone='secondary'>
                {label}
            </Text>
        </LandingPill>
    )
}
