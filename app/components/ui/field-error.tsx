import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface FieldErrorProps {
    children: ReactNode
    className?: string
}

export function FieldError({ children, className }: FieldErrorProps) {
    return (
        <Text
            role='alert'
            variant='caption'
            tone='danger'
            className={className}>
            {children}
        </Text>
    )
}
