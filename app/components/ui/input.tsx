import { forwardRef, type InputHTMLAttributes } from 'react'
import { FIELD_CLASS } from '~/data/ui/field'
import { cn } from '~/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(FIELD_CLASS, 'flex h-9', className)}
            {...props}
        />
    ),
)
Input.displayName = 'Input'
