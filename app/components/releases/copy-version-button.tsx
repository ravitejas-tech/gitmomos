import { Check, Copy } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'

export function CopyVersionButton({ tag }: { tag: string }) {
    const { copied, copy } = useCopyToClipboard()

    return (
        <Button
            variant='secondary'
            size='sm'
            title='Copy version tag'
            onClick={() => copy(tag)}>
            {copied ? <Check className='text-success' /> : <Copy />}
            <Text
                as='span'
                variant='inherit'
                className='hidden sm:inline'>
                {copied ? 'Copied!' : tag}
            </Text>
        </Button>
    )
}
