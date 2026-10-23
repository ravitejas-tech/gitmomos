import type { ReactNode } from 'react'
import { Avatar } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { REPORT_LABEL } from '~/data/reports/sections'

export interface ReportDocumentHeaderProps {
    label?: string
    headline: string
    author?: string | undefined
    children?: ReactNode
}

export function ReportDocumentHeader({ label = REPORT_LABEL, headline, author, children }: ReportDocumentHeaderProps) {
    return (
        <header className='space-y-5 border-b border-border pb-8'>
            <Text
                variant='label'
                tone='accent'>
                {label}
            </Text>
            <Text
                as='h2'
                variant='document-title'>
                {headline}
            </Text>
            <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
                {author && (
                    <Text
                        as='span'
                        variant='caption-strong'
                        tone='primary'
                        className='inline-flex items-center gap-2'>
                        <Avatar
                            name={author}
                            size='md'
                        />
                        {author}
                    </Text>
                )}
                {children}
            </div>
        </header>
    )
}
