import { ExternalLink } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { CardContent } from '~/components/ui/card-content'
import { NumberedStep } from '~/components/ui/numbered-step'
import { Text } from '~/components/ui/text'
import { AI_STUDIO_KEYS_URL, GEMINI_KEY_STEPS } from '~/data/gemini-key/constants'

export function GeminiKeyGuide() {
    return (
        <CardContent className='space-y-4 pt-4'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <Text variant='strong'>Get a free key</Text>
                <Button
                    asChild
                    variant='secondary'
                    size='sm'>
                    <a
                        href={AI_STUDIO_KEYS_URL}
                        target='_blank'
                        rel='noreferrer'>
                        <ExternalLink />
                        Open Google AI Studio
                    </a>
                </Button>
            </div>
            <ol className='space-y-4'>
                {GEMINI_KEY_STEPS.map((step, index) => (
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
