import { FileText } from 'lucide-react'
import { DigestEntry } from '~/components/public-profile/digest/entry'
import { SharedFooter } from '~/components/public-profile/report/shared-footer'
import { ReportDocumentHeader } from '~/components/reports/document/header'
import { MetaItem } from '~/components/ui/meta-item'
import { Text } from '~/components/ui/text'
import { pluralize } from '~/lib/format'
import { digestPath } from '~/lib/public-profile/handle'
import { digestTitle } from '~/lib/public-profile/report'
import type { ReportFilter, ReportSearch } from '~/types/public-profile'

export interface DigestDocumentProps {
    handle: string
    filter: ReportFilter
    digest: ReportSearch
}

export function DigestDocument({ handle, filter, digest }: DigestDocumentProps) {
    const reports = digest.reports.toReversed()

    return (
        <article className='space-y-10'>
            <ReportDocumentHeader
                label='Work summary'
                headline={digestTitle(filter)}
                author={digest.name}>
                <MetaItem icon={FileText}>{pluralize(digest.total, 'daily report')}</MetaItem>
            </ReportDocumentHeader>
            <div className='divide-y divide-border'>
                {reports.map((report) => (
                    <DigestEntry
                        key={report.date}
                        handle={handle}
                        report={report}
                    />
                ))}
            </div>
            {digest.total > reports.length && (
                <Text variant='caption'>
                    Showing the latest {reports.length} of {digest.total} reports. Narrow the period to see the rest.
                </Text>
            )}
            <SharedFooter path={digestPath(handle, filter)} />
        </article>
    )
}
