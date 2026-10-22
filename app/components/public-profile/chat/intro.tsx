import { Button } from '~/components/ui/button'
import { ChatAnswer } from '~/components/ui/chat-answer'
import { chatSuggestions } from '~/data/public-profile/constants'

export interface ProfileChatIntroProps {
    name: string
    disabled: boolean
    onAsk: (question: string) => void
}

export function ProfileChatIntro({ name, disabled, onAsk }: ProfileChatIntroProps) {
    return (
        <ChatAnswer text={`Hi! Ask me anything about ${name}’s work.`}>
            <div className='flex flex-wrap gap-2'>
                {chatSuggestions(name).map((suggestion) => (
                    <Button
                        key={suggestion}
                        variant='secondary'
                        size='chip'
                        disabled={disabled}
                        onClick={() => onAsk(suggestion)}>
                        {suggestion}
                    </Button>
                ))}
            </div>
        </ChatAnswer>
    )
}
