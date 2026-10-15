import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface PageIntroProps {
    title: ReactNode
    description: ReactNode
}

export function PageIntro({ title, description }: PageIntroProps) {
    return (
        <header className='mb-10 space-y-4'>
            <Text
                as='h1'
                variant='display'>
                {title}
            </Text>
            <Text
                variant='lead'
                tone='secondary'>
                {description}
            </Text>
        </header>
    )
}
