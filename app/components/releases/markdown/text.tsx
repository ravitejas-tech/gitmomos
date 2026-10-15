import type { HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import { Text } from '~/components/ui/text'
import { MARKDOWN_PARAGRAPH, MARKDOWN_TEXT } from '~/data/releases/markdown'

export function MarkdownText({ node, children }: HTMLAttributes<HTMLElement> & ExtraProps) {
    const style = MARKDOWN_TEXT[node?.tagName ?? ''] ?? MARKDOWN_PARAGRAPH
    return <Text {...style}>{children}</Text>
}
