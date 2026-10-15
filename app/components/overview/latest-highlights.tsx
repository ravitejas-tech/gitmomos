import { CircleCheck } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { LATEST_HIGHLIGHTS } from '~/data/activity/ranges'
import type { ReportHighlight } from '~/schemas/report.schema'

export function LatestHighlights({ highlights }: { highlights: ReportHighlight[] }) {
    return (
        <ul className='space-y-3'>
            {highlights.slice(0, LATEST_HIGHLIGHTS).map((highlight) => (
                <li
                    key={highlight.title}
                    className='flex items-start gap-3'>
                    <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-success' />
                    <div className='min-w-0 space-y-0.5'>
                        <Text variant='strong'>{highlight.title}</Text>
                        <Text
                            variant='caption'
                            tone='secondary'
                            className='line-clamp-2'>
                            {highlight.detail}
                        </Text>
                    </div>
                </li>
            ))}
        </ul>
    )
}
