import { ReportHighlights } from '~/components/reports/document/highlights'
import { ReportNextSteps } from '~/components/reports/document/next-steps'
import { ReportProjects } from '~/components/reports/document/projects'
import { ReportSection } from '~/components/reports/document/section'
import { ReportSummary } from '~/components/reports/document/summary'
import { ReportWorkMix } from '~/components/reports/document/work-mix'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import type { ReportContent } from '~/schemas/report.schema'

export function ReportContentView({ date, content }: { date: string; content: ReportContent }) {
    return (
        <>
            <ReportSummary
                summary={content.summary}
                areas={content.key_work_areas}
            />

            <ReportWorkMix date={date} />

            {content.highlights.length > 0 && (
                <ReportSection title={REPORT_SECTIONS.highlights}>
                    <ReportHighlights highlights={content.highlights} />
                </ReportSection>
            )}

            {content.repositories.length > 0 && (
                <ReportSection title={REPORT_SECTIONS.projects}>
                    <ReportProjects repositories={content.repositories} />
                </ReportSection>
            )}

            {content.suggestions.length > 0 && (
                <ReportSection title={REPORT_SECTIONS.suggestions}>
                    <ReportNextSteps steps={content.suggestions} />
                </ReportSection>
            )}
        </>
    )
}
