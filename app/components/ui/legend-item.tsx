import { Dot } from '~/components/ui/dot'
import { Text } from '~/components/ui/text'

export interface LegendItemProps {
    dot: string
    label: string
}

export function LegendItem({ dot, label }: LegendItemProps) {
    return (
        <li className='flex items-center gap-1.5'>
            <Dot className={dot} />
            <Text
                as='span'
                variant='caption'
                tone='secondary'>
                {label}
            </Text>
        </li>
    )
}
