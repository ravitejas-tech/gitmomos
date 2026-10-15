import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface SectionHeadingProps {
    eyebrow?: string
    title: string
    description?: string
    align?: 'start' | 'center'
    className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'start', className }: SectionHeadingProps) {
    return (
        <div className={cn('mb-14 max-w-2xl md:mb-20', align === 'center' && 'mx-auto text-center', className)}>
            {eyebrow && (
                <Text
                    variant='eyebrow'
                    tone='accent'
                    className='mb-4'>
                    {eyebrow}
                </Text>
            )}
            <Text
                as='h2'
                variant='display'
                tone='gradient'>
                {title}
            </Text>
            {description && (
                <Text
                    variant='lead'
                    tone='secondary'
                    className={cn('mt-5 max-w-xl', align === 'center' && 'mx-auto')}>
                    {description}
                </Text>
            )}
        </div>
    )
}
