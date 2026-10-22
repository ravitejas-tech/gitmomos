import { BotAvatar } from '~/components/ui/bot-avatar'
import { Badge } from '~/components/ui/badge'
import { BulletItem } from '~/components/ui/bullet-item'
import { Text } from '~/components/ui/text'
import { repositoryName } from '~/lib/commits/message'
import type { AskMessage } from '~/types/coming-soon'

export function AskAnswer({ text, points, sources }: AskMessage) {
    return (
        <div className='flex gap-3'>
            <BotAvatar />
            <div className='min-w-0 flex-1 space-y-3 pt-1.5'>
                <Text>{text}</Text>
                {points && (
                    <ul className='space-y-1.5'>
                        {points.map((point) => (
                            <BulletItem
                                key={point}
                                tone='accent'
                                variant='body'>
                                {point}
                            </BulletItem>
                        ))}
                    </ul>
                )}
                {sources && (
                    <div className='flex flex-wrap items-center gap-1.5'>
                        <Text
                            as='span'
                            variant='caption'>
                            Sources
                        </Text>
                        {sources.map(({ sha, repository }) => (
                            <Badge key={sha}>
                                <Text
                                    as='span'
                                    variant='meta'
                                    tone='inherit'>
                                    {sha}
                                </Text>
                                {repositoryName(repository)}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
