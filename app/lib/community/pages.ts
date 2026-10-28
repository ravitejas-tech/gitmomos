import type { CommentPage } from '~/types/community'

export function nextCommentOffset(lastPage: CommentPage | null, pages: (CommentPage | null)[]): number | undefined {
    const loaded = pages.reduce((count, page) => count + (page?.comments.length ?? 0), 0)
    return lastPage && loaded < lastPage.total ? loaded : undefined
}
