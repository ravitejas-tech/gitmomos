import { Link } from 'react-router'
import { ArrowLeft, Check, Download, Link2 } from 'lucide-react'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { profilePath } from '~/lib/public-profile/handle'
import { siteUrl } from '~/lib/seo/site-url'
import { printInLightTheme } from '~/lib/theme'

export interface ShareToolbarProps {
    handle: string
    name: string
    path: string
    pdfTitle: string
}

export function ShareToolbar({ handle, name, path, pdfTitle }: ShareToolbarProps) {
    const { copied, copy } = useCopyToClipboard()

    return (
        <div className='flex flex-wrap items-center gap-2 print:hidden'>
            <Button
                asChild
                variant='ghost'
                size='sm'
                className='mr-auto'>
                <Link to={profilePath(handle)}>
                    <ArrowLeft />
                    <Avatar name={name} />
                    {name}
                </Link>
            </Button>
            <Button
                variant='secondary'
                size='sm'
                onClick={() => copy(siteUrl(path))}>
                {copied ? <Check className='text-success' /> : <Link2 />}
                {copied ? 'Copied' : 'Copy link'}
            </Button>
            <Button
                size='sm'
                onClick={() => printInLightTheme(pdfTitle)}>
                <Download />
                Download PDF
            </Button>
        </div>
    )
}
