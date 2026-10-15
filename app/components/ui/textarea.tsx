import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { FIELD_CLASS } from '~/data/ui/field'
import { cn } from '~/lib/utils'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(FIELD_CLASS, 'resize-none', className)}
            {...props}
        />
    ),
)
Textarea.displayName = 'Textarea'
