import { RefreshCw } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useSync } from '~/hooks/reports/mutations'
import { cn } from '~/lib/utils'

export interface SyncButtonProps {
    date?: string | undefined
    label?: string
    size?: 'sm' | 'md'
    variant?: 'primary' | 'secondary'
    className?: string
}

export function SyncButton({
    date,
    label = 'Sync now',
    size = 'md',
    variant = 'secondary',
    className,
}: SyncButtonProps) {
    const { mutate: sync, isPending } = useSync()

    return (
        <Button
            variant={variant}
            size={size}
            onClick={() => sync(date)}
            disabled={isPending}
            className={className}>
            <RefreshCw className={cn(isPending && 'animate-spin')} />
            {isPending ? 'Syncing…' : label}
        </Button>
    )
}
