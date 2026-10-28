import { Link } from 'react-router'
import { DateTile } from '~/components/public-profile/reports/date-tile'
import { PdfLinkButton } from '~/components/public-profile/reports/pdf-link-button'
import { ListRow } from '~/components/ui/list-row'
import { TagList } from '~/components/ui/tag-list'
import { Text } from '~/components/ui/text'
import { LISTED_AREAS } from '~/data/public-profile/constants'
import { formatDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { PublicReport } from '~/types/public-profile'

export interface SharedReportRowProps {
    handle: string
    report: PublicReport
}

export function SharedReportRow({ handle, report }: SharedReportRowProps) {
    return (
        <ListRow
            align='start'
            className='relative'>
            <DateTile date={report.date} />
            <div className='min-w-0 flex-1 space-y-1'>
                <Link
                    to={reportPath(handle, report.date)}
                    className='after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/50 focus-visible:after:ring-inset'>
                    <Text
                        as='span'
                        variant='title'>
                        {report.headline || formatDay(report.date)}
                    </Text>
                </Link>
                {report.summary && (
                    <Text
                        variant='caption'
                        tone='secondary'
                        className='line-clamp-2 max-w-3xl'>
                        {report.summary}
                    </Text>
                )}
                <TagList
                    tags={report.key_work_areas}
                    limit={LISTED_AREAS}
                    className='pt-1'
                />
            </div>
            <PdfLinkButton
                to={reportPath(handle, report.date, true)}
                label={`Download the ${formatDay(report.date)} report as a PDF`}
                className='relative z-10 shrink-0'
                compact
            />
        </ListRow>
    )
}
