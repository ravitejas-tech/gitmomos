import type { LucideIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

export interface SegmentedOption<T extends string> {
    value: T
    label: string
    icon?: LucideIcon
}

export interface SegmentedControlProps<T extends string> {
    label: string
    value: T | undefined
    options: readonly SegmentedOption<T>[]
    onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({ label, value, options, onChange }: SegmentedControlProps<T>) {
    return (
        <div
            role='radiogroup'
            aria-label={label}
            className='inline-flex rounded-lg border border-border bg-surface-muted p-0.5'>
            {options.map(({ value: option, label: optionLabel, icon: Icon }) => (
                <button
                    key={option}
                    type='button'
                    role='radio'
                    aria-checked={option === value}
                    onClick={() => onChange(option)}
                    className={cn(
                        'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-3 text-caption font-semibold whitespace-nowrap transition-colors',
                        option === value
                            ? 'bg-surface text-text-primary shadow-card'
                            : 'text-text-secondary hover:text-text-primary',
                    )}>
                    {Icon && <Icon className='size-3.5' />}
                    {optionLabel}
                </button>
            ))}
        </div>
    )
}
