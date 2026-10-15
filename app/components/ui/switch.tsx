import { cn } from '~/lib/utils'

export interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    className?: string
}

export function Switch({ checked, onChange, label, className }: SwitchProps) {
    return (
        <button
            type='button'
            role='switch'
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={cn(
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none',
                checked ? 'bg-accent' : 'bg-border-strong',
                className,
            )}>
            <span
                className={cn(
                    'size-4 rounded-full bg-accent-foreground shadow-card transition-transform',
                    checked ? 'translate-x-4' : 'translate-x-0',
                )}
            />
        </button>
    )
}
