import { BulletItem, type BulletItemProps } from '~/components/ui/bullet-item'
import { Text } from '~/components/ui/text'

export interface MessageListProps {
    title: string
    items: readonly string[]
    tone: BulletItemProps['tone']
}

export function MessageList({ title, items, tone }: MessageListProps) {
    return (
        <div className='space-y-1.5'>
            <Text variant='eyebrow'>{title}</Text>
            <ul className='space-y-1'>
                {items.map((item) => (
                    <BulletItem
                        key={item}
                        tone={tone}
                        variant='body'>
                        {item}
                    </BulletItem>
                ))}
            </ul>
        </div>
    )
}
