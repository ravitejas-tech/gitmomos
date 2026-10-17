import { cn } from '~/lib/utils'

export interface ProgressBarProps {
    value: number
    className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
    return (
        <div className={cn('h-2 overflow-hidden rounded-full bg-surface-muted', className)}>
            <div
                className='h-full rounded-full bg-accent'
                style={{ width: `${value}%` }}
            />
        </div>
    )
}
