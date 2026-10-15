import { ShieldCheck } from 'lucide-react'
import { LegalHeading } from '~/components/legal/legal-heading'
import { TermList } from '~/components/legal/term-list'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import type { LegalSectionContent } from '~/types/legal'

export function LegalSection({ section: { heading, body, terms, callout } }: { section: LegalSectionContent }) {
    return (
        <section>
            <LegalHeading item={heading} />
            {body && (
                <Text
                    variant='article'
                    tone='secondary'
                    className='mb-6'>
                    {body}
                </Text>
            )}
            {terms && (
                <TermList
                    terms={terms}
                    className='mb-6 space-y-2'
                />
            )}
            {callout && (
                <Card
                    tone='subtle'
                    padding='md'
                    className='mb-6'>
                    <LegalHeading
                        item={callout.heading}
                        icon={<ShieldCheck className='size-4 text-text-secondary' />}
                    />
                    <Text
                        variant='article'
                        tone='secondary'>
                        <Text
                            as='strong'
                            variant='inherit'
                            tone='primary'>
                            {callout.lead}
                        </Text>{' '}
                        {callout.body}
                    </Text>
                </Card>
            )}
        </section>
    )
}
