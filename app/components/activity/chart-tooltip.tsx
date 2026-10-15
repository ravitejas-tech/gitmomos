import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface ChartTooltipRow {
    key: string
    label: string
    value: number
    marker?: ReactNode
}

export function ChartTooltip({ title, rows }: { title: string; rows: ChartTooltipRow[] }) {
    return (
        <div className='min-w-40 space-y-1.5 rounded-lg border border-border bg-surface px-3 py-2.5 shadow-overlay'>
            <Text variant='caption-strong'>{title}</Text>
            <ul className='space-y-1'>
                {rows.map((row) => (
                    <li
                        key={row.key}
                        className='flex items-center gap-2'>
                        {row.marker}
                        <Text
                            as='span'
                            variant='caption'
                            tone='secondary'
                            className='flex-1'>
                            {row.label}
                        </Text>
                        <Text
                            as='span'
                            variant='caption-strong'
                            tone='primary'
                            numeric>
                            {row.value}
                        </Text>
                    </li>
                ))}
            </ul>
        </div>
    )
}
