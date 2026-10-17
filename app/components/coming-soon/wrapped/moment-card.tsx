import type { LucideIcon } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'

export interface MomentCardProps {
    icon: LucideIcon
    eyebrow: string
    title: string
    detail: string
}

export function MomentCard({ icon, eyebrow, title, detail }: MomentCardProps) {
    return (
        <Card
            padding='md'
            className='flex gap-4'>
            <IconChip
                icon={icon}
                tone='accent'
                size='md'
            />
            <div className='min-w-0 space-y-0.5'>
                <Text variant='eyebrow'>{eyebrow}</Text>
                <Text variant='subheading'>{title}</Text>
                <Text
                    variant='caption'
                    tone='secondary'>
                    {detail}
                </Text>
            </div>
        </Card>
    )
}
