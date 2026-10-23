import { AddGeminiKeyButton } from '~/components/gemini-key/add-key-button'
import { Alert } from '~/components/ui/alert'
import { useGeminiKey } from '~/hooks/gemini-key/queries'

export interface MissingGeminiKeyAlertProps {
    children: string
    className?: string
}

export function MissingGeminiKeyAlert({ children, className }: MissingGeminiKeyAlertProps) {
    const { data: geminiKey, isSuccess } = useGeminiKey()
    if (!isSuccess || geminiKey) return null

    return (
        <Alert
            tone='warning'
            action={<AddGeminiKeyButton />}
            className={className}>
            {children}
        </Alert>
    )
}
