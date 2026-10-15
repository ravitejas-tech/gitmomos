import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import type { MarkdownTextStyle } from '~/types/releases'

export const REMARK_PLUGINS = [remarkGfm]
export const REHYPE_PLUGINS = [rehypeHighlight]

export const TASK_LIST_ITEM_CLASS = 'task-list-item'

export const MARKDOWN_PARAGRAPH: MarkdownTextStyle = {
    as: 'p',
    variant: 'article',
    tone: 'secondary',
    className: 'mb-5',
}

export const MARKDOWN_TEXT: Record<string, MarkdownTextStyle> = {
    h1: { as: 'h2', variant: 'document-title', className: 'mt-14 mb-4' },
    h2: { as: 'h2', variant: 'heading', className: 'mt-12 mb-4' },
    h3: { as: 'h3', variant: 'subheading', className: 'mt-8 mb-3' },
    h4: { as: 'h4', variant: 'title', className: 'mt-6 mb-3' },
    p: MARKDOWN_PARAGRAPH,
    strong: { as: 'strong', variant: 'inherit', tone: 'primary' },
}
