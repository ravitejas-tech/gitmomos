import { ChatBubble } from '~/components/ui/chat-bubble'
import { Text } from '~/components/ui/text'

export function ChatQuestion({ text }: { text: string }) {
    return (
        <div className='flex justify-end'>
            <ChatBubble tone='question'>
                <Text tone='inherit'>{text}</Text>
            </ChatBubble>
        </div>
    )
}
