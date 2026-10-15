import type { BadgeProps } from '~/components/ui/badge'
import type { Report } from '~/types/reports'

export function reportBadge(report: Pick<Report, 'status' | 'edited_at'>): {
    label: string
    variant: BadgeProps['variant']
} | null {
    if (report.status === 'failed') return { label: 'Failed', variant: 'danger' }
    return report.edited_at ? { label: 'Edited', variant: 'neutral' } : null
}

export function reportStatusLabel(report: Pick<Report, 'status' | 'edited_at'>): string {
    if (report.status === 'failed') return 'Failed'
    return report.edited_at ? 'Edited' : 'Written'
}
