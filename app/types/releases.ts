import type { TextProps } from '~/components/ui/text'

export interface GitHubRelease {
    id: number
    name: string
    tag_name: string
    body: string
    created_at: string
    published_at: string
    html_url: string
    author: {
        login: string
        avatar_url: string
        html_url: string
    }
    prerelease: boolean
}

export type MarkdownTextStyle = Pick<TextProps, 'as' | 'variant' | 'tone' | 'className'>
