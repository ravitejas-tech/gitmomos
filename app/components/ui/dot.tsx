import { cn } from '~/lib/utils'

export function Dot({ className }: { className?: string }) {
    return <span className={cn('size-2 shrink-0 rounded-full', className)} />
}
