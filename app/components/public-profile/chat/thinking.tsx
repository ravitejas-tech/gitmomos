import { BotAvatar } from '~/components/ui/bot-avatar'
import { ChatBubble } from '~/components/ui/chat-bubble'
import { MOMI_THINKING, THINKING_DOT_DELAYS_MS } from '~/data/public-profile/momi'

export function ProfileChatThinking() {
    return (
        <div
            role='status'
            aria-label={MOMI_THINKING}
            className='flex items-center gap-3'>
            <BotAvatar mood='thinking' />
            <ChatBubble>
                <span className='flex h-5 items-center gap-1'>
                    {THINKING_DOT_DELAYS_MS.map((delay) => (
                        <span
                            key={delay}
                            className='size-1.5 rounded-full bg-text-muted motion-safe:animate-momi-think'
                            style={{ animationDelay: `${delay}ms` }}
                        />
                    ))}
                </span>
            </ChatBubble>
        </div>
    )
}
