import type { ReactNode } from 'react'
import { BotAvatar } from '~/components/ui/bot-avatar'
import { ChatBubble } from '~/components/ui/chat-bubble'
import { Text } from '~/components/ui/text'
import type { MomiMood } from '~/types/momi'

export interface ChatAnswerProps {
    text: string
    mood?: MomiMood
    children?: ReactNode
}

export function ChatAnswer({ text, mood, children }: ChatAnswerProps) {
    return (
        <div className='flex gap-3'>
            <BotAvatar mood={mood} />
            <div className='min-w-0 flex-1 space-y-3'>
                <ChatBubble>
                    <Text className='whitespace-pre-line'>{text}</Text>
                </ChatBubble>
                {children}
            </div>
        </div>
    )
}
