import { forwardRef, type SelectHTMLAttributes } from 'react'
import { FIELD_CLASS } from '~/data/ui/field'
import { cn } from '~/lib/utils'

export interface SelectOption {
    value: string
    label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: readonly (string | SelectOption)[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, options, ...props }, ref) => (
    <select
        ref={ref}
        className={cn(FIELD_CLASS, 'flex h-9 py-0', className)}
        {...props}>
        {options.map((option) => {
            const { value, label } = typeof option === 'string' ? { value: option, label: option } : option
            return (
                <option
                    key={value}
                    value={value}>
                    {label}
                </option>
            )
        })}
    </select>
))
Select.displayName = 'Select'
