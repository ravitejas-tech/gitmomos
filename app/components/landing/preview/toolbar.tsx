import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import { Kbd } from '~/components/ui/kbd'
import { Text } from '~/components/ui/text'
import { PREVIEW_TOOLBAR } from '~/data/landing/preview'

export function PreviewToolbar() {
    const { title, period, synced } = PREVIEW_TOOLBAR

    return (
        <div className='flex h-11 shrink-0 items-center justify-between border-b border-border px-4'>
            <div className='flex items-center gap-1.5'>
                <Text
                    as='span'
                    variant='strong'>
                    {title}
                </Text>
                <ChevronRight className='size-3.5 text-text-muted' />
                <Text
                    as='span'
                    tone='secondary'>
                    {period}
                </Text>
            </div>
            <div className='flex items-center gap-3'>
                <Text
                    as='span'
                    variant='meta'>
                    {synced}
                </Text>
                <SlidersHorizontal className='size-3.5 text-text-muted' />
                <Kbd>K</Kbd>
            </div>
        </div>
    )
}
