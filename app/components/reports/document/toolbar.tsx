import { Download, Pencil } from 'lucide-react'
import { SyncButton } from '~/components/reports/sync-button'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { CopyButton } from '~/components/ui/copy-button'
import { Text } from '~/components/ui/text'
import { formatDay, timeAgo } from '~/lib/format'
import { reportToMarkdown } from '~/lib/reports/markdown'
import { reportBadge } from '~/lib/reports/status'
import { printInLightTheme } from '~/lib/theme'
import type { Report } from '~/types/reports'

export function ReportToolbar({ report, onEdit }: { report: Report; onEdit: () => void }) {
    const badge = reportBadge(report)
    const { content } = report

    return (
        <div className='flex flex-wrap items-center gap-2 print:hidden'>
            {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
            <Text
                as='span'
                variant='caption'
                className='mr-auto'>
                Updated {timeAgo(report.updated_at)}
            </Text>
            {content && (
                <>
                    <CopyButton text={reportToMarkdown(report.date, content)} />
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={() => printInLightTheme(`Daily report – ${formatDay(report.date)}`)}>
                        <Download />
                        PDF
                    </Button>
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={onEdit}>
                        <Pencil />
                        Edit
                    </Button>
                </>
            )}
            <SyncButton
                date={report.date}
                label='Regenerate'
                size='sm'
            />
        </div>
    )
}
