import { Check, Copy, ExternalLink } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { profilePath } from '~/lib/public-profile/handle'
import { siteUrl } from '~/lib/seo/site-url'

export function ProfileLinkActions({ handle }: { handle: string }) {
    const { copied, copy } = useCopyToClipboard()
    const path = profilePath(handle)

    return (
        <>
            <Button
                variant='secondary'
                onClick={() => copy(siteUrl(path))}>
                {copied ? <Check /> : <Copy />}
                {copied ? 'Copied' : 'Copy link'}
            </Button>
            <Button asChild>
                <a
                    href={path}
                    target='_blank'
                    rel='noreferrer'>
                    <ExternalLink />
                    View profile
                </a>
            </Button>
        </>
    )
}
