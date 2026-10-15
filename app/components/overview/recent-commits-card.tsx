import { CommitList } from '~/components/commits/commit-list'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { useRecentCommits } from '~/hooks/commits/queries'
import { cn } from '~/lib/utils'

export function RecentCommitsCard({ className }: { className?: string }) {
    const { data: commits, isLoading } = useRecentCommits()

    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader title='Recent commits' />
            <div className='border-t border-border'>
                <CommitList
                    commits={commits}
                    isLoading={isLoading}
                    emptyLabel='No commits yet.'
                    relative
                />
            </div>
        </Card>
    )
}
