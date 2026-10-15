import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface ReportSectionProps {
    title: string
    children: ReactNode
}

export function ReportSection({ title, children }: ReportSectionProps) {
    return (
        <section className='space-y-4 break-inside-avoid'>
            <Text
                as='h3'
                variant='label'>
                {title}
            </Text>
            {children}
        </section>
    )
}
