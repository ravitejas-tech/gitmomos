import { MessageSquareText } from 'lucide-react'
import { CommentItem } from '~/components/community/comments/item'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadMoreFooter } from '~/components/ui/load-more-footer'
import { Skeleton } from '~/components/ui/skeleton'
import type { CommentAuthor, CommentPage } from '~/types/community'

export interface CommentListProps {
    pages: (CommentPage | null)[] | undefined
    isError: boolean
    onRetry: () => void
    hasNextPage: boolean
    isFetchingNextPage: boolean
    onLoadMore: () => void
    owner: CommentAuthor
    canModerate: boolean
}

export function CommentList({
    pages,
    isError,
    onRetry,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
    owner,
    canModerate,
}: CommentListProps) {
    const comments = pages?.flatMap((page) => page?.comments ?? [])

    if (isError) {
        return (
            <div className='border-t border-border p-5'>
                <ErrorState onRetry={onRetry} />
            </div>
        )
    }

    if (!comments) return <Skeleton className='mx-5 mb-5 h-24' />

    if (!comments.length) {
        return (
            <div className='border-t border-border'>
                <EmptyState
                    tone='plain'
                    icon={MessageSquareText}
                    title='No comments yet'
                />
            </div>
        )
    }

    return (
        <>
            <ul className='divide-y divide-border border-t border-border'>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        owner={owner}
                        canModerate={canModerate}
                    />
                ))}
            </ul>
            {hasNextPage && (
                <LoadMoreFooter
                    label='Show more comments'
                    isLoading={isFetchingNextPage}
                    onLoadMore={onLoadMore}
                />
            )}
        </>
    )
}
