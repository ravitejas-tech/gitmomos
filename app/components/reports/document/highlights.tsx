import { RoundBadge } from '~/components/ui/round-badge'
import { Text } from '~/components/ui/text'
import type { ReportHighlight } from '~/schemas/report.schema'

export function ReportHighlights({ highlights }: { highlights: ReportHighlight[] }) {
    return (
        <ol className='space-y-3'>
            {highlights.map((highlight, index) => (
                <li
                    key={highlight.title}
                    className='flex gap-4 rounded-xl border border-border bg-surface-muted/40 p-4 break-inside-avoid sm:p-5'>
                    <RoundBadge>{index + 1}</RoundBadge>
                    <div className='min-w-0 space-y-1'>
                        <Text
                            as='h4'
                            variant='subheading'>
                            {highlight.title}
                        </Text>
                        {highlight.detail && (
                            <Text
                                variant='prose'
                                tone='secondary'>
                                {highlight.detail}
                            </Text>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    )
}
