import type { ReactNode } from 'react'
import { FieldError } from '~/components/ui/field-error'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface FormFieldProps {
    id: string
    label: string
    error?: string | undefined
    hint?: ReactNode
    labelAction?: ReactNode
    className?: string
    children: ReactNode
}

export function FormField({ id, label, error, hint, labelAction, className, children }: FormFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <div className='flex items-center justify-between gap-3'>
                <Text
                    as='label'
                    variant='strong'
                    htmlFor={id}>
                    {label}
                </Text>
                {labelAction}
            </div>
            {children}
            {hint && (
                <Text
                    as='div'
                    variant='caption'>
                    {hint}
                </Text>
            )}
            {error && <FieldError>{error}</FieldError>}
        </div>
    )
}
