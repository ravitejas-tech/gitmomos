import { CommentMessage } from '~/components/community/comments/message'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { timeAgo } from '~/lib/format'
import type { CommentAuthor } from '~/types/community'

export interface CommentReplyProps {
    owner: CommentAuthor
    reply: string
    repliedAt: string | null
}

export function CommentReply({ owner, reply, repliedAt }: CommentReplyProps) {
    return (
        <Card
            tone='subtle'
            padding='md'
            className='ml-10'>
            <CommentMessage
                avatarName={owner.name}
                avatarUrl={owner.avatarUrl}
                author={
                    <Text
                        as='span'
                        variant='strong'>
                        {owner.name}
                    </Text>
                }
                meta={`replied ${timeAgo(repliedAt)}`}
                text={reply}
            />
        </Card>
    )
}
