import { BulletItem } from '~/components/ui/bullet-item'

export function PreviewBulletList({ items }: { items: readonly string[] }) {
    return (
        <ul className='space-y-2'>
            {items.map((item) => (
                <BulletItem
                    key={item}
                    tone='accent'
                    variant='body'>
                    {item}
                </BulletItem>
            ))}
        </ul>
    )
}
