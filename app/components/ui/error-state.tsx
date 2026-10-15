import { AlertCircle, RotateCw } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { ERROR_STATE_COPY } from '~/data/ui/state-copy'

export interface ErrorStateProps {
    title?: string
    description?: string
    onRetry?: () => void
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
    return (
        <EmptyState
            icon={AlertCircle}
            tone='danger'
            title={title ?? ERROR_STATE_COPY.title}
            description={description ?? ERROR_STATE_COPY.description}
            action={
                onRetry && (
                    <Button
                        variant='secondary'
                        onClick={onRetry}>
                        <RotateCw />
                        Try again
                    </Button>
                )
            }
        />
    )
}
