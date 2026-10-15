import type { ReactNode } from 'react'
import { Text, type TextTone } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { TocItem } from '~/types/legal'

export interface LegalHeadingProps {
    item: TocItem
    icon?: ReactNode
    tone?: TextTone
}

export function LegalHeading({ item: { id, title, level }, icon, tone }: LegalHeadingProps) {
    return (
        <Text
            as={level === 2 ? 'h2' : 'h3'}
            id={id}
            variant={level === 2 ? 'heading' : 'subheading'}
            tone={tone}
            className={cn('flex scroll-mt-24 items-center gap-2', level === 2 ? 'mt-12 mb-4' : 'mb-3')}>
            {icon}
            {title}
        </Text>
    )
}
