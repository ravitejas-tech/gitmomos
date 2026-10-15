import type { ReactNode } from 'react'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'

export interface SettingsSectionProps {
    title: string
    description?: string
    children: ReactNode
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
    return (
        <section className='grid gap-3 border-b border-border pb-8 last:border-b-0 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10'>
            <div className='space-y-1'>
                <Text
                    as='h2'
                    variant='subheading'>
                    {title}
                </Text>
                {description && <Text variant='caption'>{description}</Text>}
            </div>
            <Card>{children}</Card>
        </section>
    )
}
