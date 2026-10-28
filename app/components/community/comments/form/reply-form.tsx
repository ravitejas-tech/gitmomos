import { MessageForm } from '~/components/community/comments/form/message-form'
import { Button } from '~/components/ui/button'
import { useReplyToComment } from '~/hooks/community/mutations'
import type { CommunityComment } from '~/types/community'

export interface ReplyFormProps {
    comment: CommunityComment
    onDone: () => void
}

export function ReplyForm({ comment, onDone }: ReplyFormProps) {
    const { mutate: reply, isPending } = useReplyToComment()

    return (
        <MessageForm
            label='Your reply'
            defaultValue={comment.reply ?? ''}
            submitLabel='Reply'
            isPending={isPending}
            autoFocus
            onSubmit={(text) => reply({ id: comment.id, reply: text }, { onSuccess: onDone })}
            onCancel={onDone}
            className='ml-10'
            secondaryAction={
                comment.reply && (
                    <Button
                        type='button'
                        variant='danger'
                        disabled={isPending}
                        onClick={() => reply({ id: comment.id, reply: null }, { onSuccess: onDone })}
                        className='mr-auto'>
                        Remove reply
                    </Button>
                )
            }
        />
    )
}
