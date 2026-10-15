import { WorkMixBar } from '~/components/activity/work-mix-bar'
import { ReportSection } from '~/components/reports/document/section'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import { useActivity } from '~/hooks/activity/queries'

export function ReportWorkMix({ date }: { date: string }) {
    const { data: activity } = useActivity({ variables: { from: date, to: date } })
    if (!activity?.kinds.length) return null

    return (
        <ReportSection title={REPORT_SECTIONS.workMix}>
            <WorkMixBar kinds={activity.kinds} />
        </ReportSection>
    )
}
