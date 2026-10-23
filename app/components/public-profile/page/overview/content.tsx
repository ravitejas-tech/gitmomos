import { FocusAreas } from '~/components/public-profile/page/overview/focus-areas'
import { RecentReports } from '~/components/public-profile/page/overview/recent-reports'
import { RecentlyShipped } from '~/components/public-profile/page/overview/shipped'
import { TrackRecord } from '~/components/public-profile/page/overview/track-record'
import type { PublicProfile } from '~/types/public-profile'

export function ProfileOverviewContent({ profile }: { profile: PublicProfile }) {
    return (
        <div className='space-y-14'>
            {profile.shipped.length > 0 && (
                <RecentlyShipped
                    handle={profile.handle}
                    shipped={profile.shipped}
                />
            )}
            <div className='grid gap-14 md:grid-cols-2 md:gap-10'>
                <TrackRecord profile={profile} />
                <FocusAreas areas={profile.areas} />
            </div>
            {profile.recent.length > 0 && (
                <RecentReports
                    handle={profile.handle}
                    recent={profile.recent}
                />
            )}
        </div>
    )
}
