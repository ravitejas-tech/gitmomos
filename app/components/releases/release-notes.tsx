import ReactMarkdown from 'react-markdown'
import { MARKDOWN_COMPONENTS } from '~/components/releases/markdown/components'
import { EMPTY_RELEASE_NOTES } from '~/data/releases/constants'
import { REHYPE_PLUGINS, REMARK_PLUGINS } from '~/data/releases/markdown'

export function ReleaseNotes({ body }: { body: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={REMARK_PLUGINS}
            rehypePlugins={REHYPE_PLUGINS}
            components={MARKDOWN_COMPONENTS}>
            {body || EMPTY_RELEASE_NOTES}
        </ReactMarkdown>
    )
}
