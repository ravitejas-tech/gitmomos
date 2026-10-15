import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Text } from '~/components/ui/text'

export function ChangeIndicator({ value }: { value: number | null }) {
    if (value === null) return null
    const Icon = value > 0 ? ArrowUpRight : value < 0 ? ArrowDownRight : ArrowRight

    return (
        <Text
            as='span'
            variant='caption-strong'
            tone={value > 0 ? 'success' : value < 0 ? 'danger' : 'muted'}
            className='inline-flex items-center gap-0.5'>
            <Icon className='size-3.5' />
            {Math.abs(value)}%
        </Text>
    )
}
