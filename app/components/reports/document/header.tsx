import { CalendarDays, FolderGit2, GitCommitHorizontal } from 'lucide-react'
import { MetaItem } from '~/components/reports/document/meta-item'
import { Avatar } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { REPORT_LABEL } from '~/data/reports/sections'
import { useProfile } from '~/hooks/profile/queries'
import { formatDay, pluralize } from '~/lib/format'
import type { Report } from '~/types/reports'

export function ReportDocumentHeader({ report }: { report: Report }) {
    const { data: profile } = useProfile()
    const name = profile?.full_name || profile?.email || ''
    const projects = report.content?.repositories.length ?? 0

    return (
        <header className='space-y-5 border-b border-border pb-8'>
            <Text
                variant='label'
                tone='accent'>
                {REPORT_LABEL}
            </Text>
            <Text
                as='h2'
                variant='document-title'>
                {report.content?.headline || formatDay(report.date)}
            </Text>
            <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
                {name && (
                    <Text
                        as='span'
                        variant='caption-strong'
                        tone='primary'
                        className='inline-flex items-center gap-2'>
                        <Avatar
                            name={name}
                            size='md'
                        />
                        {name}
                    </Text>
                )}
                <MetaItem icon={CalendarDays}>{formatDay(report.date)}</MetaItem>
                <MetaItem icon={GitCommitHorizontal}>{pluralize(report.commit_count, 'commit')}</MetaItem>
                {projects > 0 && <MetaItem icon={FolderGit2}>{pluralize(projects, 'project')}</MetaItem>}
            </div>
        </header>
    )
}
