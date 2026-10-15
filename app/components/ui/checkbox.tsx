import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export const Checkbox = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            type='checkbox'
            className={cn('size-4 cursor-pointer rounded accent-accent', className)}
            {...props}
        />
    ),
)
Checkbox.displayName = 'Checkbox'
