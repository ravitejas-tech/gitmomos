import { useEffect, useRef } from 'react'
import { ProfileChatIntro } from '~/components/public-profile/chat/intro'
import { ProfileChatSources } from '~/components/public-profile/chat/sources'
import { BotAvatar } from '~/components/ui/bot-avatar'
import { ChatAnswer } from '~/components/ui/chat-answer'
import { ChatQuestion } from '~/components/ui/chat-question'
import { Spinner } from '~/components/ui/spinner'
import type { ChatMessage } from '~/types/public-profile'

export interface ProfileChatThreadProps {
    name: string
    messages: ChatMessage[]
    isPending: boolean
    onAsk: (question: string) => void
}

export function ProfileChatThread({ name, messages, isPending, onAsk }: ProfileChatThreadProps) {
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messages.length) endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }, [messages.length, isPending])

    return (
        <div className='h-120 space-y-6 overflow-y-auto border-t border-border p-5'>
            {!messages.length && (
                <ProfileChatIntro
                    name={name}
                    disabled={isPending}
                    onAsk={onAsk}
                />
            )}
            {messages.map(({ id, role, text, sources }) =>
                role === 'visitor' ? (
                    <ChatQuestion
                        key={id}
                        text={text}
                    />
                ) : (
                    <ChatAnswer
                        key={id}
                        text={text}>
                        {!!sources?.length && <ProfileChatSources sources={sources} />}
                    </ChatAnswer>
                ),
            )}
            {isPending && (
                <div className='flex items-center gap-3'>
                    <BotAvatar />
                    <Spinner className='size-4 text-text-muted' />
                </div>
            )}
            <div ref={endRef} />
        </div>
    )
}
