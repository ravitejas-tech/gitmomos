import type { HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export function MarkdownList({ node, children }: HTMLAttributes<HTMLElement> & ExtraProps) {
    const Tag = node?.tagName === 'ol' ? 'ol' : 'ul'
    return <Tag className='mb-6 space-y-2'>{children}</Tag>
}
