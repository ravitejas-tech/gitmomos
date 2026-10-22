import { useState } from 'react'
import { ProfileChatForm } from '~/components/public-profile/chat/form'
import { ProfileChatThread } from '~/components/public-profile/chat/thread'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { PanelFooter } from '~/components/ui/panel-footer'
import { CHAT_HISTORY_MESSAGES } from '~/data/public-profile/constants'
import { useAskProfile } from '~/hooks/public-profile/mutations'
import type { ChatMessage } from '~/types/public-profile'

export interface ProfileChatProps {
    handle: string
    name: string
}

export function ProfileChat({ handle, name }: ProfileChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const { mutate: ask, isPending } = useAskProfile()

    function send(question: string, onAnswered?: () => void) {
        const history = messages.slice(-CHAT_HISTORY_MESSAGES).map(({ role, text }) => ({ role, text }))
        const asked: ChatMessage = { id: crypto.randomUUID(), role: 'visitor', text: question }
        setMessages((current) => [...current, asked])
        ask(
            { handle, question, history },
            {
                onSuccess: ({ answer, sources }) => {
                    setMessages((current) => [
                        ...current,
                        { id: crypto.randomUUID(), role: 'assistant', text: answer, sources },
                    ])
                    onAnswered?.()
                },
                onError: () => setMessages((current) => current.filter(({ id }) => id !== asked.id)),
            },
        )
    }

    return (
        <Card>
            <CardHeader
                title={`Ask about ${name}`}
                description='Answers come from their daily work reports.'
            />
            <ProfileChatThread
                name={name}
                messages={messages}
                isPending={isPending}
                onAsk={send}
            />
            <PanelFooter>
                <ProfileChatForm
                    isPending={isPending}
                    onAsk={send}
                />
            </PanelFooter>
        </Card>
    )
}
