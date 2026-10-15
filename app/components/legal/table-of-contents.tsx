import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { scrollToId } from '~/lib/scroll'
import { cn } from '~/lib/utils'
import type { TocItem } from '~/types/legal'

export interface TableOfContentsProps {
    items: readonly TocItem[]
    activeId?: string
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
    return (
        <aside className='hidden w-48 shrink-0 xl:block'>
            <div className='sticky top-24'>
                <Text
                    variant='eyebrow'
                    className='mb-3'>
                    On this page
                </Text>
                <nav className='flex flex-col items-start gap-2 border-l border-border pl-4'>
                    {items.map(({ id, title, level }) => (
                        <TextLink
                            key={id}
                            href={`#${id}`}
                            variant='caption'
                            active={id === activeId}
                            className={cn(level === 3 && 'ml-3')}
                            onClick={(event) => {
                                event.preventDefault()
                                scrollToId(id)
                            }}>
                            {title}
                        </TextLink>
                    ))}
                </nav>
            </div>
        </aside>
    )
}
