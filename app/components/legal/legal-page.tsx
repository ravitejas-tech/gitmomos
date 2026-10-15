import type { ReactNode } from 'react'
import { PageIntro } from '~/components/ui/page-intro'
import { Text } from '~/components/ui/text'

export interface LegalPageProps {
    title: string
    intro: string
    footnote?: string
    children: ReactNode
}

export function LegalPage({ title, intro, footnote, children }: LegalPageProps) {
    return (
        <>
            <PageIntro
                title={
                    <Text
                        as='span'
                        variant='inherit'
                        tone='gradient'>
                        {title}
                    </Text>
                }
                description={intro}
            />
            {children}
            {footnote && (
                <div className='mt-16 border-t border-border pt-6'>
                    <Text variant='meta'>{footnote}</Text>
                </div>
            )}
        </>
    )
}
