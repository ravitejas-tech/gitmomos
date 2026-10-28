import type { ReactNode } from 'react'
import { Avatar } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'

export interface CommentMessageProps {
    avatarName: string
    avatarUrl: string | null
    author: ReactNode
    meta: string
    text: string
    children?: ReactNode
}

export function CommentMessage({ avatarName, avatarUrl, author, meta, text, children }: CommentMessageProps) {
    return (
        <div className='flex gap-3'>
            <Avatar
                name={avatarName}
                src={avatarUrl}
                size='md'
            />
            <div className='min-w-0 flex-1 space-y-1'>
                <div className='flex flex-wrap items-baseline gap-x-2'>
                    {author}
                    <Text
                        as='span'
                        variant='caption'>
                        {meta}
                    </Text>
                </div>
                <Text className='whitespace-pre-line'>{text}</Text>
                {children}
            </div>
        </div>
    )
}
