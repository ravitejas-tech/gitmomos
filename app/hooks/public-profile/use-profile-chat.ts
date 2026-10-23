import { useState } from 'react'
import { CHAT_HISTORY_MESSAGES } from '~/data/public-profile/constants'
import { useAskProfile } from '~/hooks/public-profile/mutations'
import type { ChatMessage } from '~/types/public-profile'

export function useProfileChat(handle: string) {
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

    return { messages, isPending, send, reset: () => setMessages([]) }
}
