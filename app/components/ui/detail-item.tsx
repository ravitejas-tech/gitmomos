import type { LiHTMLAttributes, ReactNode } from 'react'
import { Text, type TextTone } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface DetailItemProps extends Pick<LiHTMLAttributes<HTMLLIElement>, 'aria-current'> {
    leading: ReactNode
    title: string
    description?: string
    tone?: TextTone
}

export function DetailItem({ leading, title, description, tone, ...props }: DetailItemProps) {
    return (
        <li
            className={cn('flex gap-3', !description && 'items-center')}
            {...props}>
            {leading}
            <div className='space-y-0.5'>
                <Text
                    variant='strong'
                    tone={tone}>
                    {title}
                </Text>
                {description && (
                    <Text
                        variant='caption'
                        tone='secondary'>
                        {description}
                    </Text>
                )}
            </div>
        </li>
    )
}
