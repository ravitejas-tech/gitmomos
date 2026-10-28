import { DashboardPage } from '~/components/layout/dashboard-page'
import { LeaderboardBoard } from '~/components/leaderboard/board'
import { LeaderboardStanding } from '~/components/leaderboard/standing'
import { PrivateProfileAlert } from '~/components/public-profile/private-alert'

export default function LeaderboardPage() {
    return (
        <DashboardPage
            title='Leaderboard'
            description='Developers with a public profile, ranked by all-time commits.'>
            <div className='space-y-6'>
                <PrivateProfileAlert>Your profile is private, so you’re not on the leaderboard.</PrivateProfileAlert>
                <LeaderboardStanding />
                <LeaderboardBoard />
            </div>
        </DashboardPage>
    )
}
