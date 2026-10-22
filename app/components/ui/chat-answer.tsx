import type { ReactNode } from 'react'
import { BotAvatar } from '~/components/ui/bot-avatar'
import { Text } from '~/components/ui/text'

export interface ChatAnswerProps {
    text: string
    children?: ReactNode
}

export function ChatAnswer({ text, children }: ChatAnswerProps) {
    return (
        <div className='flex gap-3'>
            <BotAvatar />
            <div className='min-w-0 flex-1 space-y-3 pt-1.5'>
                <Text>{text}</Text>
                {children}
            </div>
        </div>
    )
}
