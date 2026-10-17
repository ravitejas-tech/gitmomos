import { Dot } from '~/components/ui/dot'
import { WORK_KINDS } from '~/data/activity/kinds'
import { cn } from '~/lib/utils'
import type { WorkKind } from '~/types/activity'

export function KindDot({ kind, className }: { kind: WorkKind; className?: string }) {
    return <Dot className={cn(WORK_KINDS[kind].dot, className)} />
}
