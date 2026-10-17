import type { LucideIcon } from 'lucide-react'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface BadgeTileProps {
    icon: LucideIcon
    name: string
    detail: string
    earned: boolean
}

export function BadgeTile({ icon, name, detail, earned }: BadgeTileProps) {
    return (
        <li
            className={cn(
                'flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center',
                !earned && 'opacity-50',
            )}>
            <IconChip
                icon={icon}
                tone={earned ? 'accent' : 'neutral'}
                size='md'
            />
            <Text variant='caption-strong'>{name}</Text>
            <Text variant='micro'>{detail}</Text>
        </li>
    )
}
