import { Button } from '~/components/ui/button'
import { Momi } from '~/components/ui/momi'
import { Text } from '~/components/ui/text'
import { chatSuggestions } from '~/data/public-profile/constants'
import { MOMI_HELLO, momiIntro } from '~/data/public-profile/momi'

export interface ProfileChatIntroProps {
    name: string
    area?: string | undefined
    disabled: boolean
    onAsk: (question: string) => void
}

export function ProfileChatIntro({ name, area, disabled, onAsk }: ProfileChatIntroProps) {
    return (
        <div className='flex flex-col items-center gap-4 text-center'>
            <Momi
                mood='happy'
                animated
                className='size-16'
            />
            <div className='space-y-1'>
                <Text
                    as='h3'
                    variant='subheading'>
                    {MOMI_HELLO}
                </Text>
                <Text tone='secondary'>{momiIntro(name)}</Text>
            </div>
            <div className='flex w-full flex-col gap-2'>
                {chatSuggestions(name, area).map((suggestion) => (
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
        </div>
    )
}
