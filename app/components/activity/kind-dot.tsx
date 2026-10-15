import { WORK_KINDS } from '~/data/activity/kinds'
import { cn } from '~/lib/utils'
import type { WorkKind } from '~/types/activity'

export function KindDot({ kind, className }: { kind: WorkKind; className?: string }) {
    return <span className={cn('size-2 shrink-0 rounded-full', WORK_KINDS[kind].dot, className)} />
}
