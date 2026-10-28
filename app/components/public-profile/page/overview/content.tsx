import { FocusAreas } from '~/components/public-profile/page/overview/focus-areas'
import { ProfileProjects } from '~/components/public-profile/page/overview/projects'
import { RecentReports } from '~/components/public-profile/page/overview/recent-reports'
import { RecentlyShipped } from '~/components/public-profile/page/overview/shipped'
import { TrackRecord } from '~/components/public-profile/page/overview/track-record'
import { usePublicProjects } from '~/hooks/projects/queries'
import { cn } from '~/lib/utils'
import type { PublicProfile } from '~/types/public-profile'

export function ProfileOverviewContent({ profile }: { profile: PublicProfile }) {
    const { data: projects = [] } = usePublicProjects({ variables: profile.handle })
    const hasWork = projects.length > 0 || profile.shipped.length > 0 || profile.recent.length > 0

    return (
        <div className={cn('grid gap-14 xl:gap-12', hasWork && 'xl:grid-cols-3')}>
            {hasWork && (
                <div className='space-y-14 xl:col-span-2'>
                    {projects.length > 0 && (
                        <ProfileProjects
                            handle={profile.handle}
                            projects={projects}
                        />
                    )}
                    {profile.shipped.length > 0 && (
                        <RecentlyShipped
                            handle={profile.handle}
                            shipped={profile.shipped}
                        />
                    )}
                    {profile.recent.length > 0 && (
                        <RecentReports
                            handle={profile.handle}
                            recent={profile.recent}
                        />
                    )}
                </div>
            )}
            <div className='grid content-start gap-14 md:grid-cols-2 md:gap-10 xl:grid-cols-1 xl:gap-14'>
                <TrackRecord profile={profile} />
                <FocusAreas areas={profile.areas} />
            </div>
        </div>
    )
}
