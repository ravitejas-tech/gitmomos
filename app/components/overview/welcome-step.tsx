import { Text } from '~/components/ui/text'

export interface WelcomeStepProps {
    step: number
    title: string
    description: string
}

export function WelcomeStep({ step, title, description }: WelcomeStepProps) {
    return (
        <li className='flex gap-3'>
            <Text
                as='span'
                variant='caption-strong'
                tone='accent'
                className='flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-subtle'>
                {step}
            </Text>
            <div className='space-y-0.5'>
                <Text variant='strong'>{title}</Text>
                <Text
                    variant='caption'
                    tone='secondary'>
                    {description}
                </Text>
            </div>
        </li>
    )
}
