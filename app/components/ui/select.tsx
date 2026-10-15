import { forwardRef, type SelectHTMLAttributes } from 'react'
import { FIELD_CLASS } from '~/data/ui/field'
import { cn } from '~/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: readonly string[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, options, ...props }, ref) => (
    <select
        ref={ref}
        className={cn(FIELD_CLASS, 'flex h-9 py-0', className)}
        {...props}>
        {options.map((option) => (
            <option
                key={option}
                value={option}>
                {option}
            </option>
        ))}
    </select>
))
Select.displayName = 'Select'
