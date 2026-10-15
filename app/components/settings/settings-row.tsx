import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface SettingsRowProps {
    label: string
    htmlFor?: string
    description?: ReactNode
    children: ReactNode
}

export function SettingsRow({ label, htmlFor, description, children }: SettingsRowProps) {
    return (
        <div className='flex flex-col gap-3 border-b border-border px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between'>
            <div className='min-w-0 space-y-0.5'>
                <Text
                    as='label'
                    variant='strong'
                    htmlFor={htmlFor}>
                    {label}
                </Text>
                {description && (
                    <Text
                        as='div'
                        variant='caption'>
                        {description}
                    </Text>
                )}
            </div>
            <div className='sm:w-72 sm:shrink-0'>{children}</div>
        </div>
    )
}
