import { Send } from 'lucide-react'
import { AskAnswer } from '~/components/coming-soon/ask/answer'
import { ChatQuestion } from '~/components/ui/chat-question'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
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
                <div className='flex gap-2'>
                    <Input
                        aria-label='Ask about your work'
                        placeholder='Ask about your work…'
                        readOnly
                    />
                    <Button>
                        <Send />
                        Ask
                    </Button>
                </div>
            </PanelFooter>
        </Card>
    )
}
