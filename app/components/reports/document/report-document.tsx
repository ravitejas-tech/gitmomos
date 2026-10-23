import { CalendarDays, FolderGit2, GitCommitHorizontal } from 'lucide-react'
import { ReportContentView } from '~/components/reports/document/content-view'
import { ReportFailure } from '~/components/reports/document/failure'
import { ReportDocumentHeader } from '~/components/reports/document/header'
import { MetaItem } from '~/components/ui/meta-item'
import { ReportTechnicalDetails } from '~/components/reports/document/technical-details'
import { useProfile } from '~/hooks/profile/queries'
import { formatDay, pluralize } from '~/lib/format'
import type { Report } from '~/types/reports'

export function ReportDocument({ report }: { report: Report }) {
    const { data: profile } = useProfile()
    const projects = report.content?.repositories.length ?? 0

    return (
        <article className='space-y-10'>
            <ReportDocumentHeader
                headline={report.content?.headline || formatDay(report.date)}
                author={profile?.full_name || profile?.email}>
                <MetaItem icon={CalendarDays}>{formatDay(report.date)}</MetaItem>
                <MetaItem icon={GitCommitHorizontal}>{pluralize(report.commit_count, 'commit')}</MetaItem>
                {projects > 0 && <MetaItem icon={FolderGit2}>{pluralize(projects, 'project')}</MetaItem>}
            </ReportDocumentHeader>
            {report.status === 'failed' && <ReportFailure report={report} />}
            {report.content && (
                <ReportContentView
                    date={report.date}
                    content={report.content}
                />
            )}
            <ReportTechnicalDetails date={report.date} />
        </article>
    )
}
