import { Copy } from 'lucide-react'
import { VignetteStage } from '~/components/landing/features/vignettes/stage'
import { BulletItem } from '~/components/ui/bullet-item'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Kbd } from '~/components/ui/kbd'
import { Text } from '~/components/ui/text'
import { COPY_SNIPPET } from '~/data/landing/vignettes'

export function CopyReportVignette() {
    const { title, bullets, action, keys } = COPY_SNIPPET

    return (
        <VignetteStage className='items-center'>
            <Card className='w-full max-w-sm shadow-overlay'>
                <div className='flex items-center justify-between border-b border-border px-4 py-2.5'>
                    <Text variant='strong'>{title}</Text>
                    <Text variant='micro'>Edited</Text>
                </div>
                <ul className='space-y-1.5 px-4 py-3'>
                    {bullets.map((bullet) => (
                        <BulletItem
                            key={bullet}
                            tone='accent'
                            variant='body'>
                            {bullet}
                        </BulletItem>
                    ))}
                </ul>
                <div className='flex items-center justify-between border-t border-border px-4 py-2.5'>
                    <Button
                        variant='secondary'
                        size='sm'>
                        <Copy />
                        {action}
                    </Button>
                    <span className='flex gap-1'>
                        {keys.map((key) => (
                            <Kbd key={key}>{key}</Kbd>
                        ))}
                    </span>
                </div>
            </Card>
        </VignetteStage>
    )
}
