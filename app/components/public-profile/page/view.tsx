import { Globe } from 'lucide-react'
import { ConsistencyCard } from '~/components/activity/consistency-card'
import { ProfileChat } from '~/components/public-profile/chat/chat'
import { PublicProfileHeader } from '~/components/public-profile/page/header'
import { PublicProfileRecentWork } from '~/components/public-profile/page/recent-work'
import { PublicProfileStats } from '~/components/public-profile/page/stats'
import { Container } from '~/components/ui/container'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { usePublicProfile } from '~/hooks/public-profile/queries'

export function PublicProfileView({ handle }: { handle: string }) {
    const { data: profile, isPending, isError, refetch } = usePublicProfile({ variables: handle })

    return (
        <Container className='space-y-6 py-10 lg:py-14'>
            {isPending && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {profile === null && (
                <EmptyState
                    icon={Globe}
                    title='This profile isn’t public'
                    description='Check the link, or ask its owner to share it again.'
                />
            )}
            {profile && (
                <>
                    <PublicProfileHeader profile={profile} />
                    <PublicProfileStats stats={profile.stats} />
                    <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]'>
                        <ProfileChat
                            handle={profile.handle}
                            name={profile.name}
                        />
                        <div className='space-y-6'>
                            <ConsistencyCard daily={profile.daily} />
                            <PublicProfileRecentWork recent={profile.recent} />
                        </div>
                    </div>
                </>
            )}
        </Container>
    )
}
