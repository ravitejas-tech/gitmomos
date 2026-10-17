import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface DetailItemProps {
    leading: ReactNode
    title: string
    description: string
}

export function DetailItem({ leading, title, description }: DetailItemProps) {
    return (
        <li className='flex gap-3'>
            {leading}
            <div className='space-y-0.5'>
                <Text variant='strong'>{title}</Text>
                <Text
                    variant='caption'
                    tone='secondary'>
                    {description}
                </Text>
            </div>
        </li>
    )
}
