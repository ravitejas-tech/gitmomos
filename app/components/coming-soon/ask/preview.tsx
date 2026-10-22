import { AskAnswer } from '~/components/coming-soon/ask/answer'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { ChatComposer } from '~/components/ui/chat-composer'
import { ChatQuestion } from '~/components/ui/chat-question'
import { PanelFooter } from '~/components/ui/panel-footer'
import { ASK_SUGGESTIONS, ASK_THREAD } from '~/data/coming-soon/ask'

export function AskPreview() {
    return (
        <Card>
            <div className='space-y-6 p-5'>
                {ASK_THREAD.map((message) =>
                    message.role === 'user' ? (
                        <ChatQuestion
                            key={message.text}
                            text={message.text}
                        />
                    ) : (
                        <AskAnswer
                            key={message.text}
                            {...message}
                        />
                    ),
                )}
            </div>
            <PanelFooter className='space-y-3'>
                <div className='flex flex-wrap gap-2'>
                    {ASK_SUGGESTIONS.map((suggestion) => (
                        <Badge key={suggestion}>{suggestion}</Badge>
                    ))}
                </div>
                <ChatComposer
                    aria-label='Ask about your work'
                    placeholder='Ask about your work…'
                    readOnly
                />
            </PanelFooter>
        </Card>
    )
}
