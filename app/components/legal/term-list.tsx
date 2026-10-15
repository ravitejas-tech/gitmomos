import { BulletItem, type BulletItemProps } from '~/components/ui/bullet-item'
import { Text } from '~/components/ui/text'
import type { LegalTerm } from '~/types/legal'

export interface TermListProps {
    terms: readonly LegalTerm[]
    tone?: BulletItemProps['tone']
    variant?: BulletItemProps['variant']
    className?: string
}

export function TermList({ terms, tone, variant, className }: TermListProps) {
    return (
        <ul className={className}>
            {terms.map(({ term, description }) => (
                <BulletItem
                    key={term}
                    tone={tone}
                    variant={variant}>
                    <Text
                        as='strong'
                        variant='inherit'
                        tone='primary'>
                        {term}:
                    </Text>{' '}
                    {description.split('`').map((part, index) =>
                        index % 2 ? (
                            <Text
                                key={part}
                                as='code'
                                variant='code'
                                tone='accent'>
                                {part}
                            </Text>
                        ) : (
                            part
                        ),
                    )}
                </BulletItem>
            ))}
        </ul>
    )
}
