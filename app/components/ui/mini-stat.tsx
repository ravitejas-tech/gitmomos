import { Text } from '~/components/ui/text'

export interface MiniStatProps {
    value: string | number
    label: string
    size?: 'md' | 'lg'
}

export function MiniStat({ value, label, size = 'md' }: MiniStatProps) {
    return (
        <div className='space-y-0.5'>
            <Text
                variant={size === 'lg' ? 'stat' : 'heading'}
                numeric>
                {value}
            </Text>
            <Text variant='caption'>{label}</Text>
        </div>
    )
}
