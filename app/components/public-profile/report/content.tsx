import { ReportHighlights } from '~/components/reports/document/highlights'
import { ReportSection } from '~/components/reports/document/section'
import { ReportSummary } from '~/components/reports/document/summary'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import type { PublicReport } from '~/types/public-profile'

export function SharedReportContent({
    report,
}: {
    report: Pick<PublicReport, 'summary' | 'key_work_areas' | 'highlights'>
}) {
    return (
        <>
            <ReportSummary
                summary={report.summary}
                areas={report.key_work_areas}
            />
            {report.highlights.length > 0 && (
                <ReportSection title={REPORT_SECTIONS.highlights}>
                    <ReportHighlights highlights={report.highlights} />
                </ReportSection>
            )}
        </>
    )
}
