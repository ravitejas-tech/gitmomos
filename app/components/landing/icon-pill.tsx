import type { LucideIcon } from 'lucide-react'
import { Pill } from '~/components/ui/pill'
import { Text } from '~/components/ui/text'

export interface LandingIconPillProps {
    icon: LucideIcon
    label: string
}

export function LandingIconPill({ icon: Icon, label }: LandingIconPillProps) {
    return (
        <Pill>
            <Icon className='size-3.5 text-accent-text' />
            <Text
                as='span'
                variant='caption'
                tone='secondary'>
                {label}
            </Text>
        </Pill>
    )
}
