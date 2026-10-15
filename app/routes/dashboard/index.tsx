import { useState } from 'react'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { Overview } from '~/components/overview/overview'
import { WelcomePanel } from '~/components/overview/welcome-panel'
import { SyncButton } from '~/components/reports/sync-button'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { ACTIVITY_RANGES, DEFAULT_ACTIVITY_RANGE } from '~/data/activity/ranges'
import { useConnections } from '~/hooks/connections/queries'
import { useProfile } from '~/hooks/profile/queries'
import { formatDay, todayLocal } from '~/lib/format'
import { greeting } from '~/lib/greeting'
import type { ActivityRange } from '~/types/activity'

export default function OverviewPage() {
    const [range, setRange] = useState<ActivityRange>(DEFAULT_ACTIVITY_RANGE)
    const { data: profile } = useProfile()
    const { data: connections } = useConnections()
    const hasConnections = Boolean(connections?.length)

    return (
        <DashboardPage
            title={greeting(profile?.full_name?.split(' ')[0])}
            description={formatDay(todayLocal())}
            actions={
                hasConnections && (
                    <>
                        <SegmentedControl
                            label='Period'
                            value={range}
                            options={ACTIVITY_RANGES}
                            onChange={setRange}
                        />
                        <SyncButton variant='primary' />
                    </>
                )
            }>
            {connections?.length === 0 ? <WelcomePanel /> : <Overview days={Number(range)} />}
        </DashboardPage>
    )
}
