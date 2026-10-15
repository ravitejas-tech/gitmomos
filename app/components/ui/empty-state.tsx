import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const emptyStateVariants = cva('flex flex-col items-center justify-center rounded-lg px-6 py-14 text-center', {
    variants: {
        tone: {
            default: 'border border-dashed border-border-strong',
            danger: 'border border-danger/20 bg-danger-subtle',
            plain: '',
        },
    },
    defaultVariants: { tone: 'default' },
})

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
    icon: LucideIcon
    title: string
    description?: ReactNode
    action?: ReactNode
    className?: string
}

export function EmptyState({ icon, title, description, action, tone, className }: EmptyStateProps) {
    return (
        <div className={cn(emptyStateVariants({ tone }), className)}>
            <IconChip
                icon={icon}
                tone={tone === 'danger' ? 'danger' : 'neutral'}
                size='md'
                className='mb-4'
            />
            <Text
                as='h3'
                variant='title'>
                {title}
            </Text>
            {description && (
                <Text
                    tone='secondary'
                    className='mt-1 max-w-sm'>
                    {description}
                </Text>
            )}
            {action && <div className='mt-5'>{action}</div>}
        </div>
    )
}
