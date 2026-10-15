import { use, type HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import { CodeBlockContext } from '~/components/releases/markdown/code-block-context'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export function MarkdownCode({ className, children }: HTMLAttributes<HTMLElement> & ExtraProps) {
    const inBlock = use(CodeBlockContext)

    return inBlock ? (
        <Text
            as='code'
            variant='code'
            tone='inherit'
            className={cn('block p-4', className)}>
            {children}
        </Text>
    ) : (
        <Text
            as='code'
            variant='code'
            tone='accent'>
            {children}
        </Text>
    )
}
