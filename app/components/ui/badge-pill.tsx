import type { ReactNode } from 'react'
import { Pill } from '~/components/ui/pill'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'

export interface BadgePillProps {
    badge: string
    label: string
    children?: ReactNode
}

export function BadgePill({ badge, label, children }: BadgePillProps) {
    return (
        <Pill className='max-w-full pr-2.5 pl-1'>
            <Badge variant='accent'>{badge}</Badge>
            <Text
                as='span'
                variant='caption'
                tone='secondary'
                truncate>
                {label}
            </Text>
            {children}
        </Pill>
    )
}
