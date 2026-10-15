import { useCallback, useState } from 'react'
import { COPIED_FEEDBACK_MS } from '~/data/ui/timing'

export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false)

    const copy = useCallback(async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS)
    }, [])

    return { copied, copy }
}
