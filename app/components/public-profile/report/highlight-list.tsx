import { CircleCheck } from 'lucide-react'
import { Text } from '~/components/ui/text'
import type { ReportHighlight } from '~/schemas/report.schema'

export function HighlightList({ highlights }: { highlights: ReportHighlight[] }) {
    return (
        <ul className='space-y-3'>
            {highlights.map(({ title, detail }) => (
                <li
                    key={title}
                    className='flex gap-3 break-inside-avoid'>
                    <CircleCheck className='mt-0.5 size-4 shrink-0 text-success' />
                    <div className='min-w-0 space-y-0.5'>
                        <Text variant='strong'>{title}</Text>
                        {detail && (
                            <Text
                                variant='caption'
                                tone='secondary'>
                                {detail}
                            </Text>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
