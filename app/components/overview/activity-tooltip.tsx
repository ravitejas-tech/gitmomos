import type { TooltipContentProps } from 'recharts'
import { ChartTooltip } from '~/components/activity/chart-tooltip'
import { KindDot } from '~/components/activity/kind-dot'
import { WORK_KIND_ORDER, WORK_KINDS } from '~/data/activity/kinds'
import { formatShortDay } from '~/lib/format'

export function ActivityTooltip({ active, payload, label }: TooltipContentProps) {
    if (!active || !payload?.length) return null
    const rows = WORK_KIND_ORDER.flatMap((kind) => {
        const value = Number(payload.find((item) => item.dataKey === kind)?.value ?? 0)
        return value ? [{ key: kind, label: WORK_KINDS[kind].label, value, marker: <KindDot kind={kind} /> }] : []
    })

    return (
        <ChartTooltip
            title={formatShortDay(String(label))}
            rows={rows}
        />
    )
}
