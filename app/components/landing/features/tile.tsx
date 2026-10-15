import type { ComponentType } from 'react'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface FeatureTileProps {
    title: string
    description: string
    span: string
    vignette: ComponentType
}

export function FeatureTile({ title, description, span, vignette: Vignette }: FeatureTileProps) {
    return (
        <Card className={cn('flex flex-col', span)}>
            <div
                aria-hidden
                inert
                className='relative h-60 overflow-hidden select-none'>
                <Vignette />
            </div>
            <div className='mt-auto px-6 pt-2 pb-6'>
                <Text
                    as='h3'
                    variant='subheading'>
                    {title}
                </Text>
                <Text
                    tone='secondary'
                    className='mt-1.5 max-w-sm'>
                    {description}
                </Text>
            </div>
        </Card>
    )
}
