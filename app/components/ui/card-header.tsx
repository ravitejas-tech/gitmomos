import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface CardHeaderProps {
    title: ReactNode
    description?: ReactNode
    leading?: ReactNode
    actions?: ReactNode
    className?: string
}

export function CardHeader({ title, description, leading, actions, className }: CardHeaderProps) {
    return (
        <div className={cn('flex items-center gap-3 px-5 pt-5 pb-4', className)}>
            {leading}
            <div className='min-w-0 flex-1 space-y-0.5'>
                <Text
                    as='h3'
                    variant='title'>
                    {title}
                </Text>
                {description && (
                    <Text
                        as='div'
                        variant='caption'>
                        {description}
                    </Text>
                )}
            </div>
            {actions && <div className='flex items-center gap-1'>{actions}</div>}
        </div>
    )
}
