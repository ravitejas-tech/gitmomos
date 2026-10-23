import { useEffect, useRef } from 'react'
import { ProfileChatIntro } from '~/components/public-profile/chat/intro'
import { ProfileChatSources } from '~/components/public-profile/chat/sources/list'
import { ProfileChatThinking } from '~/components/public-profile/chat/thinking'
import { ChatAnswer } from '~/components/ui/chat-answer'
import { ChatQuestion } from '~/components/ui/chat-question'
import type { ChatMessage } from '~/types/public-profile'

export interface ProfileChatThreadProps {
    handle: string
    name: string
    area?: string | undefined
    messages: ChatMessage[]
    isPending: boolean
    onAsk: (question: string) => void
}

export function ProfileChatThread({ handle, name, area, messages, isPending, onAsk }: ProfileChatThreadProps) {
    const threadRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const thread = threadRef.current
        if (messages.length && thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' })
    }, [messages.length, isPending])

    return (
        <div
            ref={threadRef}
            className='min-h-0 flex-1 space-y-5 overflow-y-auto border-t border-border p-5'>
            {!messages.length && (
                <ProfileChatIntro
                    name={name}
                    area={area}
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
                        {!!sources?.length && (
                            <ProfileChatSources
                                handle={handle}
                                sources={sources}
                            />
                        )}
                    </ChatAnswer>
                ),
            )}
            {isPending && <ProfileChatThinking />}
        </div>
    )
}
