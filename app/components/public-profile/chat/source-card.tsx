import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { formatDate } from '~/lib/format'
import type { PublicReport } from '~/types/public-profile'

export interface SourceCardProps {
    report: PublicReport
    onOpen: (report: PublicReport) => void
}

export function SourceCard({ report, onOpen }: SourceCardProps) {
    return (
        <Card
            tone='interactive'
            padding='md'
            className='h-full space-y-1'>
            <Text variant='micro'>{formatDate(report.date)}</Text>
            <button
                type='button'
                onClick={() => onOpen(report)}
                className='cursor-pointer text-left after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/50'>
                <Text
                    as='span'
                    variant='title'>
                    {report.headline}
                </Text>
            </button>
            <Text
                variant='caption'
                className='line-clamp-2'>
                {report.summary}
            </Text>
        </Card>
    )
}
