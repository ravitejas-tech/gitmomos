import { Link } from 'react-router'
import { ArrowRight, CalendarDays, GitCommitHorizontal, Timer } from 'lucide-react'
import { FeedCard } from '~/components/community/feed/card'
import { FeedStat } from '~/components/community/feed/stat'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { TagList } from '~/components/ui/tag-list'
import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { formatDay, formatDuration, formatNumber, formatShortDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { FeedEntryOf } from '~/types/community'

export interface FeedReportProps {
    entry: FeedEntryOf<'day'>
    report: NonNullable<FeedEntryOf<'day'>['report']>
}

export function FeedReport({ entry, report }: FeedReportProps) {
    const { person, date, at, minutes, commits } = entry
    const path = person.handle ? reportPath(person.handle, date) : null

    return (
        <FeedCard
            person={person}
            action='shared their daily report'
            at={at}
            badge={
                <Badge
                    variant='neutral'
                    className='shrink-0 max-sm:hidden'>
                    <CalendarDays className='size-3' />
                    {formatShortDay(date)}
                </Badge>
            }
            footer={
                <>
                    {minutes > 0 && (
                        <FeedStat
                            icon={Timer}
                            value={formatDuration(minutes)}
                            label='worked'
                        />
                    )}
                    {commits > 0 && (
                        <FeedStat
                            icon={GitCommitHorizontal}
                            value={formatNumber(commits)}
                            label={commits === 1 ? 'commit' : 'commits'}
                        />
                    )}
                    {path && (
                        <Button
                            asChild
                            variant='ghost'
                            size='sm'
                            className='ml-auto'>
                            <Link to={path}>
                                Read report
                                <ArrowRight />
                            </Link>
                        </Button>
                    )}
                </>
            }>
            {path ? (
                <TextLink
                    href={path}
                    variant='heading'
                    hover='accent'
                    active>
                    {report.headline || formatDay(date)}
                </TextLink>
            ) : (
                <Text variant='heading'>{report.headline || formatDay(date)}</Text>
            )}
            {report.summary && (
                <Text
                    tone='secondary'
                    className='line-clamp-3'>
                    {report.summary}
                </Text>
            )}
            <TagList tags={report.areas} />
        </FeedCard>
    )
}
