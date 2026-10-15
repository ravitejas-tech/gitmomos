import { Text } from '~/components/ui/text'
import type { ReportHighlight } from '~/schemas/report.schema'

export function ReportHighlights({ highlights }: { highlights: ReportHighlight[] }) {
    return (
        <ol className='space-y-3'>
            {highlights.map((highlight, index) => (
                <li
                    key={highlight.title}
                    className='flex gap-4 rounded-xl border border-border bg-surface-muted/40 p-4 break-inside-avoid sm:p-5'>
                    <Text
                        as='span'
                        variant='caption-strong'
                        tone='accent'
                        numeric
                        className='flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-subtle'>
                        {index + 1}
                    </Text>
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
