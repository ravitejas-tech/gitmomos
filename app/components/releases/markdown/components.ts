import type { Components } from 'react-markdown'
import { MarkdownCode } from '~/components/releases/markdown/code'
import { MarkdownCodeBlock } from '~/components/releases/markdown/code-block'
import { MarkdownLink } from '~/components/releases/markdown/link'
import { MarkdownList } from '~/components/releases/markdown/list'
import { MarkdownListItem } from '~/components/releases/markdown/list-item'
import { MarkdownText } from '~/components/releases/markdown/text'

export const MARKDOWN_COMPONENTS: Components = {
    h1: MarkdownText,
    h2: MarkdownText,
    h3: MarkdownText,
    h4: MarkdownText,
    p: MarkdownText,
    strong: MarkdownText,
    ul: MarkdownList,
    ol: MarkdownList,
    li: MarkdownListItem,
    a: MarkdownLink,
    code: MarkdownCode,
    pre: MarkdownCodeBlock,
}
