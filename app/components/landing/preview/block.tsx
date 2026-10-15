import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface PreviewBlockProps {
    title: string
    children: ReactNode
}

export function PreviewBlock({ title, children }: PreviewBlockProps) {
    return (
        <section>
            <Text
                as='h4'
                variant='caption-strong'
                className='mb-3'>
                {title}
            </Text>
            {children}
        </section>
    )
}
