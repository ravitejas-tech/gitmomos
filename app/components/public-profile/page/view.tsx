import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { Globe } from 'lucide-react'
import { MomiDrawer } from '~/components/public-profile/chat/drawer'
import { ProfileIdentity } from '~/components/public-profile/page/identity'
import { MadeWith } from '~/components/public-profile/page/made-with'
import { ProfileOverviewContent } from '~/components/public-profile/page/overview/content'
import { ProfileTabs } from '~/components/public-profile/page/tabs'
import { SharedReportsSection } from '~/components/public-profile/reports/section'
import { Container } from '~/components/ui/container'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { TAB_PARAM, WORK_LOG_TAB } from '~/data/public-profile/constants'
import { usePublicProfile } from '~/hooks/public-profile/queries'

export function PublicProfileView({ handle }: { handle: string }) {
    const [params] = useSearchParams()
    const [isChatOpen, setChatOpen] = useState(false)
    const tab = params.get(TAB_PARAM) === WORK_LOG_TAB ? WORK_LOG_TAB : 'overview'
    const { data: profile, isPending, isError, refetch } = usePublicProfile({ variables: handle })

    if (!profile) {
        return (
            <Container className='py-16'>
                {isPending && <LoadingState />}
                {isError && <ErrorState onRetry={() => refetch()} />}
                {profile === null && (
                    <EmptyState
                        icon={Globe}
                        title='This profile isn’t public'
                        description='Check the link, or ask its owner to share it again.'
                    />
                )}
            </Container>
        )
    }

    return (
        <>
            <ProfileIdentity
                profile={profile}
                onAsk={() => setChatOpen(true)}
            />
            <Container
                size='document'
                className='space-y-10 pb-16'>
                <ProfileTabs
                    handle={profile.handle}
                    active={tab}
                />
                {tab === WORK_LOG_TAB ? (
                    <SharedReportsSection handle={profile.handle} />
                ) : (
                    <ProfileOverviewContent profile={profile} />
                )}
                <MadeWith />
            </Container>
            {profile.can_ask && (
                <MomiDrawer
                    profile={profile}
                    open={isChatOpen}
                    onClose={() => setChatOpen(false)}
                />
            )}
        </>
    )
}
