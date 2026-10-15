import type { HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import { CodeBlockContext } from '~/components/releases/markdown/code-block-context'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { codeLanguage } from '~/lib/releases'

export function MarkdownCodeBlock({ node, children }: HTMLAttributes<HTMLPreElement> & ExtraProps) {
    const code = node?.children[0]
    const language = codeLanguage(code?.type === 'element' ? code.properties.className : undefined)

    return (
        <Card
            tone='subtle'
            className='mb-6'>
            <div className='border-b border-border px-4 py-2'>
                <Text
                    as='span'
                    variant='meta'>
                    {language}
                </Text>
            </div>
            <CodeBlockContext value>
                <pre className='overflow-x-auto'>{children}</pre>
            </CodeBlockContext>
        </Card>
    )
}
