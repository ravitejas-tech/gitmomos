import { ExternalLink } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { CardContent } from '~/components/ui/card-content'
import { NumberedStep } from '~/components/ui/numbered-step'
import { Text } from '~/components/ui/text'
import { AI_PROVIDERS } from '~/data/ai-key/providers'
import type { AiProvider } from '~/types/ai-key'

export function AiKeyGuide({ provider }: { provider: AiProvider }) {
    const { guideTitle, keysUrl, keysLabel, steps } = AI_PROVIDERS[provider]

    return (
        <CardContent className='space-y-4 pt-4'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <Text variant='strong'>{guideTitle}</Text>
                <Button
                    asChild
                    variant='secondary'
                    size='sm'>
                    <a
                        href={keysUrl}
                        target='_blank'
                        rel='noreferrer'>
                        <ExternalLink />
                        {keysLabel}
                    </a>
                </Button>
            </div>
            <ol className='space-y-4'>
                {steps.map((step, index) => (
                    <NumberedStep
                        key={step.title}
                        step={index + 1}
                        {...step}
                    />
                ))}
            </ol>
        </CardContent>
    )
}
