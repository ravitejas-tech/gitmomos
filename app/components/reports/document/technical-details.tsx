import { ChevronRight } from 'lucide-react'
import { CommitList } from '~/components/commits/commit-list'
import { Text } from '~/components/ui/text'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import { useDayCommits } from '~/hooks/commits/queries'

export function ReportTechnicalDetails({ date }: { date: string }) {
    const { data: commits, isLoading } = useDayCommits({ variables: date })

    return (
        <details className='group overflow-hidden rounded-xl border border-border 2xl:hidden print:hidden'>
            <summary className='flex cursor-pointer list-none items-center gap-2 px-5 py-3.5 transition-colors hover:bg-surface-muted/50'>
                <ChevronRight className='size-4 text-text-muted transition-transform group-open:rotate-90' />
                <Text
                    as='span'
                    variant='title'>
                    {REPORT_SECTIONS.commits}
                </Text>
                {commits && (
                    <Text
                        as='span'
                        variant='caption'>
                        {commits.length}
                    </Text>
                )}
            </summary>
            <div className='border-t border-border'>
                <CommitList
                    commits={commits}
                    isLoading={isLoading}
                    emptyLabel='No commits recorded for this day.'
                />
            </div>
        </details>
    )
}
