import { Link } from 'react-router'
import { HighlightList } from '~/components/public-profile/report/highlight-list'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { formatDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { PublicReport } from '~/types/public-profile'

export interface DigestEntryProps {
    handle: string
    report: PublicReport
}

export function DigestEntry({ handle, report }: DigestEntryProps) {
    return (
        <section className='space-y-4 py-8 first:pt-0 last:pb-0'>
            <div className='space-y-1'>
                <Text
                    variant='label'
                    tone='accent'>
                    {formatDay(report.date)}
                </Text>
                <Link
                    to={reportPath(handle, report.date)}
                    className='hover:underline'>
                    <Text
                        as='h3'
                        variant='heading'>
                        {report.headline || formatDay(report.date)}
                    </Text>
                </Link>
            </div>
            <Text
                variant='prose'
                tone='secondary'>
                {report.summary}
            </Text>
            {report.highlights.length > 0 && <HighlightList highlights={report.highlights} />}
            {report.key_work_areas.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                    {report.key_work_areas.map((area) => (
                        <Badge
                            key={area}
                            variant='neutral'>
                            {area}
                        </Badge>
                    ))}
                </div>
            )}
        </section>
    )
}
