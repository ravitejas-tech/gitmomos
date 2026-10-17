import { Text } from '~/components/ui/text'

export interface MiniStatProps {
    value: string | number
    label: string
}

export function MiniStat({ value, label }: MiniStatProps) {
    return (
        <div className='space-y-0.5'>
            <Text
                variant='heading'
                numeric>
                {value}
            </Text>
            <Text variant='caption'>{label}</Text>
        </div>
    )
}
