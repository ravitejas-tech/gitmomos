import { Tag } from 'lucide-react'
import { Container } from '~/components/ui/container'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { PageIntro } from '~/components/ui/page-intro'
import { RELEASES_DESCRIPTION } from '~/data/releases/constants'

export interface ReleasesStatusProps {
    isLoading: boolean
    isError: boolean
    onRetry: () => void
}

export function ReleasesStatus({ isLoading, isError, onRetry }: ReleasesStatusProps) {
    return (
        <Container
            size='sm'
            className='py-16 md:py-24'>
            <PageIntro
                title='Releases'
                description={RELEASES_DESCRIPTION}
            />
            {isLoading && <LoadingState />}
            {!isLoading && isError && <ErrorState onRetry={onRetry} />}
            {!isLoading && !isError && (
                <EmptyState
                    icon={Tag}
                    title='No releases yet'
                />
            )}
        </Container>
    )
}
