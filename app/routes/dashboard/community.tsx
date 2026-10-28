import { ReceivedComments } from '~/components/community/comments/received'
import { FeedSection } from '~/components/community/feed/section'
import { PeopleSection } from '~/components/community/people/section'
import { CommunityActivityCard } from '~/components/community/sidebar/activity-card'
import { PeopleResults } from '~/components/community/search/people-results'
import { CommunityProfileCard } from '~/components/community/sidebar/profile-card'
import { TopDevelopersCard } from '~/components/community/sidebar/top-developers'
import { CommunityTabs } from '~/components/community/tabs'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { PrivateProfileAlert } from '~/components/public-profile/private-alert'
import { Card } from '~/components/ui/card'
import { COMMENTS_TAB, FEED_TAB, PEOPLE_TAB } from '~/data/community/constants'
import { useCommunityFilters } from '~/hooks/community/use-community-filters'

export default function CommunityPage() {
    const { tab, relation, setRelation } = useCommunityFilters()

    return (
        <DashboardPage
            title='Community'
            description='What the developers you follow are shipping.'>
            <div className='space-y-6'>
                <PrivateProfileAlert>
                    Your profile is private, so people can’t find, follow or comment on it.
                </PrivateProfileAlert>
                <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] 2xl:grid-cols-[minmax(0,1fr)_24rem]'>
                    <div className='min-w-0 space-y-6'>
                        <CommunityTabs active={tab} />
                        {tab === FEED_TAB && <FeedSection />}
                        {tab === COMMENTS_TAB && <ReceivedComments />}
                        {tab === PEOPLE_TAB && (
                            <PeopleSection
                                relation={relation}
                                onRelationChange={setRelation}
                            />
                        )}
                    </div>
                    <aside className='space-y-6'>
                        <CommunityProfileCard />
                        <CommunityActivityCard />
                        <TopDevelopersCard />
                        <Card>
                            <PeopleResults search='' />
                        </Card>
                    </aside>
                </div>
            </div>
        </DashboardPage>
    )
}
