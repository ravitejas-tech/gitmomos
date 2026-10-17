import { ChevronDown } from 'lucide-react'
import { Text } from '~/components/ui/text'
import type { LandingFaq } from '~/types/landing'

export function FaqItem({ question, answer }: LandingFaq) {
    return (
        <details className='group py-5'>
            <summary className='flex cursor-pointer list-none items-center justify-between gap-6'>
                <Text
                    as='h3'
                    variant='subheading'>
                    {question}
                </Text>
                <ChevronDown className='size-5 shrink-0 text-text-muted transition-transform group-open:rotate-180' />
            </summary>
            <Text
                tone='secondary'
                className='mt-3 max-w-2xl pr-11'>
                {answer}
            </Text>
        </details>
    )
}
