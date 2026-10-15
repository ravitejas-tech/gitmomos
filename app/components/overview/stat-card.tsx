import type { LucideIcon } from 'lucide-react'
import { ChangeIndicator } from '~/components/overview/change-indicator'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'

export interface StatCardProps {
    label: string
    value: string | number
    icon: LucideIcon
    hint: string
    change?: number | null
}

export function StatCard({ label, value, icon, hint, change = null }: StatCardProps) {
    return (
        <Card
            padding='lg'
            className='space-y-4'>
            <div className='flex items-center justify-between gap-3'>
                <Text
                    variant='caption-strong'
                    tone='secondary'>
                    {label}
                </Text>
                <IconChip
                    icon={icon}
                    tone='accent'
                />
            </div>
            <div className='space-y-1'>
                <Text variant='stat'>{value}</Text>
                <div className='flex items-center gap-1.5'>
                    <ChangeIndicator value={change} />
                    <Text
                        as='span'
                        variant='caption'>
                        {hint}
                    </Text>
                </div>
            </div>
        </Card>
    )
}
