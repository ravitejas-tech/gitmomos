import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { OverviewSection } from '~/components/public-profile/page/overview/section'
import { PdfLinkButton } from '~/components/public-profile/reports/pdf-link-button'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { formatDay, formatShortDay } from '~/lib/format'
import { reportPath, workLogPath } from '~/lib/public-profile/handle'
import type { RecentReport } from '~/types/public-profile'

export interface RecentReportsProps {
    handle: string
    recent: RecentReport[]
}

export function RecentReports({ handle, recent }: RecentReportsProps) {
    return (
        <OverviewSection
            title='Latest reports'
            action={
                <Button
                    asChild
                    variant='ghost'
                    size='sm'>
                    <Link to={workLogPath(handle)}>
                        Open work log
                        <ArrowRight />
                    </Link>
                </Button>
            }>
            <ul className='-mt-2 divide-y divide-border'>
                {recent.map((report) => (
                    <li
                        key={report.date}
                        className='relative flex items-center gap-4 py-3'>
                        <Text
                            as='span'
                            variant='caption'
                            className='w-24 shrink-0'>
                            {formatShortDay(report.date)}
                        </Text>
                        <Link
                            to={reportPath(handle, report.date)}
                            className='min-w-0 flex-1 after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/50'>
                            <Text
                                as='span'
                                variant='strong'>
                                {report.headline || formatDay(report.date)}
                            </Text>
                        </Link>
                        <PdfLinkButton
                            to={reportPath(handle, report.date, true)}
                            label={`Download the ${formatDay(report.date)} report as a PDF`}
                            variant='ghost'
                            className='relative z-10 shrink-0'
                            compact
                        />
                    </li>
                ))}
            </ul>
        </OverviewSection>
    )
}
