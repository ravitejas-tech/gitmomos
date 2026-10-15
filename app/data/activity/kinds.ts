import { Constants } from '~/types/database'
import type { WorkKind } from '~/types/activity'

export const WORK_KIND_ORDER = Constants.public.Enums.work_kind

export const WORK_KINDS: Record<WorkKind, { label: string; color: string; dot: string }> = {
    feature: { label: 'New features', color: 'var(--kind-feature)', dot: 'bg-kind-feature' },
    fix: { label: 'Bug fixes', color: 'var(--kind-fix)', dot: 'bg-kind-fix' },
    improvement: { label: 'Improvements', color: 'var(--kind-improvement)', dot: 'bg-kind-improvement' },
    maintenance: { label: 'Maintenance', color: 'var(--kind-maintenance)', dot: 'bg-kind-maintenance' },
    docs: { label: 'Documentation', color: 'var(--kind-docs)', dot: 'bg-kind-docs' },
    tests: { label: 'Testing', color: 'var(--kind-tests)', dot: 'bg-kind-tests' },
    other: { label: 'Other work', color: 'var(--kind-other)', dot: 'bg-kind-other' },
}
