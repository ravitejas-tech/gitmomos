import type { AnchorHTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import { isExternalUrl } from '~/lib/url'

export function MarkdownLink({ href = '', children }: AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) {
    const external = isExternalUrl(href)
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className='text-accent-text underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent-text'>
            {children}
        </a>
    )
}
