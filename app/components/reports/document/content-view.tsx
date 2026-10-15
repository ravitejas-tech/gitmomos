import { ReportHighlights } from '~/components/reports/document/highlights'
import { ReportNextSteps } from '~/components/reports/document/next-steps'
import { ReportProjects } from '~/components/reports/document/projects'
import { ReportSection } from '~/components/reports/document/section'
import { ReportWorkMix } from '~/components/reports/document/work-mix'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import type { ReportContent } from '~/schemas/report.schema'

export function ReportContentView({ date, content }: { date: string; content: ReportContent }) {
    return (
        <>
            <div className='space-y-4'>
                <Text
                    variant='lead'
                    className='leading-8'>
                    {content.summary}
                </Text>
                {content.key_work_areas.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                        {content.key_work_areas.map((area) => (
                            <Badge
                                key={area}
                                variant='accent'>
                                {area}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

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
