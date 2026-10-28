import type { LucideIcon } from 'lucide-react'
import { Text } from '~/components/ui/text'

export interface FeedStatProps {
    icon: LucideIcon
    value: string
    label: string
}

export function FeedStat({ icon: Icon, value, label }: FeedStatProps) {
    return (
        <div className='flex items-center gap-2'>
            <Icon className='size-4 text-text-muted' />
            <Text
                as='span'
                variant='strong'
                numeric>
                {value}
            </Text>
            <Text
                as='span'
                variant='caption'>
                {label}
            </Text>
        </div>
    )
}
