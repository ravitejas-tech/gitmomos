import { useState } from 'react'
import { Reply, Trash2 } from 'lucide-react'
import { CommentMessage } from '~/components/community/comments/message'
import { CommentReply } from '~/components/community/comments/reply'
import { ReplyForm } from '~/components/community/comments/form/reply-form'
import { MemberName } from '~/components/community/member-name'
import { Button } from '~/components/ui/button'
import { useDeleteComment } from '~/hooks/community/mutations'
import { memberName } from '~/lib/community/member'
import { timeAgo } from '~/lib/format'
import type { CommentAuthor, CommunityComment } from '~/types/community'

export interface CommentItemProps {
    comment: CommunityComment
    owner: CommentAuthor
    canModerate: boolean
}

export function CommentItem({ comment, owner, canModerate }: CommentItemProps) {
    const [isReplying, setReplying] = useState(false)
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment()
    const { author } = comment

    const confirmDelete = () => {
        if (window.confirm('Delete this comment?')) deleteComment(comment.id)
    }

    return (
        <li className='space-y-3 px-5 py-4'>
            <CommentMessage
                avatarName={memberName(author)}
                avatarUrl={author.avatar_url}
                author={<MemberName member={author} />}
                meta={timeAgo(comment.created_at)}
                text={comment.body}>
                {(canModerate || author.is_self) && (
                    <div className='-ml-3 flex gap-1 pt-1'>
                        {canModerate && !isReplying && (
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={() => setReplying(true)}>
                                <Reply />
                                {comment.reply ? 'Edit reply' : 'Reply'}
                            </Button>
                        )}
                        <Button
                            variant='danger'
                            size='sm'
                            disabled={isDeleting}
                            onClick={confirmDelete}>
                            <Trash2 />
                            Delete
                        </Button>
                    </div>
                )}
            </CommentMessage>
            {isReplying && (
                <ReplyForm
                    comment={comment}
                    onDone={() => setReplying(false)}
                />
            )}
            {!isReplying && comment.reply && (
                <CommentReply
                    owner={owner}
                    reply={comment.reply}
                    repliedAt={comment.replied_at}
                />
            )}
        </li>
    )
}
