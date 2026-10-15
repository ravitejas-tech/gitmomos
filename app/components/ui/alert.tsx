import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const alertVariants = cva('flex items-start gap-3 rounded-lg border p-3 text-sm', {
    variants: {
        tone: {
            danger: 'border-danger/20 bg-danger-subtle text-danger',
            success: 'border-success/20 bg-success-subtle text-success',
        },
    },
    defaultVariants: { tone: 'danger' },
})

export interface AlertProps extends VariantProps<typeof alertVariants> {
    children: ReactNode
    action?: ReactNode
    className?: string
}

export function Alert({ tone, children, action, className }: AlertProps) {
    const Icon = tone === 'success' ? CheckCircle2 : AlertCircle
    return (
        <div
            role='alert'
            className={cn(alertVariants({ tone }), className)}>
            <Icon className='mt-0.5 size-4 shrink-0' />
            <div className='flex-1 leading-6'>{children}</div>
            {action}
        </div>
    )
}
