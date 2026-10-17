import { BotAvatar } from '~/components/coming-soon/bot-avatar'
import { MessageList } from '~/components/coming-soon/standup/message-list'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { STANDUP_MESSAGE } from '~/data/coming-soon/standup'

export function StandupMessage() {
    const { time, title, summary, done, next, meta } = STANDUP_MESSAGE

    return (
        <Card
            padding='md'
            className='flex gap-3'>
            <BotAvatar />
            <div className='min-w-0 flex-1 space-y-3'>
                <div className='flex flex-wrap items-center gap-2'>
                    <Text
                        as='span'
                        variant='strong'>
                        gitmomos
                    </Text>
                    <Badge variant='neutral'>App</Badge>
                    <Text
                        as='span'
                        variant='caption'>
                        {time}
                    </Text>
                </div>
                <div className='space-y-1'>
                    <Text variant='strong'>{title}</Text>
                    <Text tone='secondary'>{summary}</Text>
                </div>
                <MessageList
                    title='Done'
                    items={done}
                    tone='success'
                />
                <MessageList
                    title='Next'
                    items={next}
                    tone='accent'
                />
                <Text variant='caption'>
                    {meta} ·{' '}
                    <Text
                        as='span'
                        variant='caption-strong'
                        tone='accent'>
                        Open the full report
                    </Text>
                </Text>
            </div>
        </Card>
    )
}
