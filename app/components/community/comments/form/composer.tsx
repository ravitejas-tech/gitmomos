import { MessageForm } from '~/components/community/comments/form/message-form'
import { useSaveComment } from '~/hooks/community/mutations'

export interface CommentComposerProps {
    handle: string
    name: string
    body: string | null
}

export function CommentComposer({ handle, name, body }: CommentComposerProps) {
    const { mutate: saveComment, isPending } = useSaveComment()

    return (
        <MessageForm
            label='Your comment'
            placeholder={`What was it like to work with ${name}?`}
            defaultValue={body ?? ''}
            submitLabel={body ? 'Update comment' : 'Post comment'}
            isPending={isPending}
            onSubmit={(text) => saveComment({ handle, body: text })}
            className='px-5 pb-5'
        />
    )
}
