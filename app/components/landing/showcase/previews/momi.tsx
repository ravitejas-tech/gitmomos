import { ProfileChatHeader } from '~/components/public-profile/chat/header'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { ChatAnswer } from '~/components/ui/chat-answer'
import { ChatComposer } from '~/components/ui/chat-composer'
import { ChatQuestion } from '~/components/ui/chat-question'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Text } from '~/components/ui/text'
import { SAMPLE_CHAT } from '~/data/landing/showcase-samples'
import { pluralize } from '~/lib/format'

export function MomiShowcase() {
    const { name, question, answer, sources, placeholder } = SAMPLE_CHAT

    return (
        <Card>
            <ProfileChatHeader
                name={name}
                onClose={() => undefined}
            />
            <div className='space-y-5 border-t border-border p-5'>
                <ChatQuestion text={question} />
                <ChatAnswer
                    text={answer}
                    mood='happy'>
                    <div className='flex flex-wrap items-center gap-1.5'>
                        <Text
                            as='span'
                            variant='caption'>
                            From {pluralize(sources.length, 'daily report')}
                        </Text>
                        {sources.map((day) => (
                            <Badge key={day}>{day}</Badge>
                        ))}
                    </div>
                </ChatAnswer>
            </div>
            <PanelFooter>
                <ChatComposer
                    aria-label={placeholder}
                    placeholder={placeholder}
                    readOnly
                />
            </PanelFooter>
        </Card>
    )
}
