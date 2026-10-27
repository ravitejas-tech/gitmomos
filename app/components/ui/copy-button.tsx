import { Check, Copy } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
    const { copied, copy } = useCopyToClipboard()

    return (
        <Button
            variant='secondary'
            size='sm'
            onClick={() => copy(text)}>
            {copied ? <Check className='text-success' /> : <Copy />}
            {copied ? 'Copied' : label}
        </Button>
    )
}
