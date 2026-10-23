import type { ReactNode } from 'react'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'

export interface SettingsSectionProps {
    id?: string
    title: string
    description?: string
    isLoading?: boolean
    children: ReactNode
}

export function SettingsSection({ id, title, description, isLoading, children }: SettingsSectionProps) {
    return (
        <section
            id={id}
            className='grid scroll-mt-8 gap-3 border-b border-border pb-8 last:border-b-0 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10'>
            <div className='space-y-1'>
                <Text
                    as='h2'
                    variant='subheading'>
                    {title}
                </Text>
                {description && <Text variant='caption'>{description}</Text>}
            </div>
            <Card>{isLoading ? <Skeleton className='m-4 h-24' /> : children}</Card>
        </section>
    )
}
