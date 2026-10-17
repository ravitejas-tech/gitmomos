import { Legend } from '~/components/ui/legend'
import { WORK_KINDS } from '~/data/activity/kinds'
import type { WorkKind } from '~/types/activity'

export function KindLegend({ kinds }: { kinds: readonly WorkKind[] }) {
    return <Legend items={kinds.map((kind) => ({ dot: WORK_KINDS[kind].dot, label: WORK_KINDS[kind].label }))} />
}
