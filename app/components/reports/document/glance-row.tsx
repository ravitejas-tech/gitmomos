import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export function GlanceRow({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className='flex items-center justify-between gap-3'>
            <Text
                as='span'
                variant='caption'>
                {label}
            </Text>
            <Text
                as='span'
                variant='strong'
                numeric
                truncate>
                {children}
            </Text>
        </div>
    )
}
