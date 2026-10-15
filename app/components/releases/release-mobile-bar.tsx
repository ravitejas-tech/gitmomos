import { Menu, Tag, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'

export interface ReleaseMobileBarProps {
    tag: string
    isOpen: boolean
    onToggle: () => void
}

export function ReleaseMobileBar({ tag, isOpen, onToggle }: ReleaseMobileBarProps) {
    return (
        <Card
            tone='subtle'
            className='sticky top-16 z-30 flex w-full items-center justify-between px-4 py-2 lg:hidden'>
            <Text
                as='span'
                variant='strong'
                className='flex items-center gap-2'>
                <Tag className='size-4 text-text-muted' />
                {tag}
            </Text>
            <Button
                variant='ghost'
                size='icon'
                aria-label='Toggle versions'
                onClick={onToggle}>
                {isOpen ? <X /> : <Menu />}
            </Button>
        </Card>
    )
}
