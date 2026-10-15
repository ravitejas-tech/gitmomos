import type { TooltipContentProps } from 'recharts'
import { ChartTooltip } from '~/components/activity/chart-tooltip'
import { formatHour } from '~/lib/format'

export function HoursTooltip({ active, payload, label }: TooltipContentProps) {
    if (!active || !payload?.length) return null
    const hour = Number(label)

    return (
        <ChartTooltip
            title={`${formatHour(hour)} – ${formatHour((hour + 1) % 24)}`}
            rows={[{ key: 'commits', label: 'Commits', value: Number(payload[0]?.value ?? 0) }]}
        />
    )
}
