import { NavLink } from 'react-router'
import { AlertCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { LoadingState } from '~/components/ui/loading-state'
import { CONNECTIONS_PATH } from '~/data/navigation'

export function GitHubCallbackStatus({ error }: { error: string | null }) {
    if (!error) return <LoadingState />

    return (
        <EmptyState
            icon={AlertCircle}
            tone='danger'
            title='Couldn’t connect GitHub'
            description={error}
            action={
                <Button
                    asChild
                    variant='secondary'>
                    <NavLink to={CONNECTIONS_PATH}>Back to connections</NavLink>
                </Button>
            }
        />
    )
}
