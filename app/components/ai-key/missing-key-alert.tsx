import { AddAiKeyButton } from '~/components/ai-key/add-key-button'
import { Alert } from '~/components/ui/alert'
import { useAiKey } from '~/hooks/ai-key/queries'

export interface MissingAiKeyAlertProps {
    children: string
    className?: string
}

export function MissingAiKeyAlert({ children, className }: MissingAiKeyAlertProps) {
    const { data: aiKey, isSuccess } = useAiKey()
    if (!isSuccess || aiKey) return null

    return (
        <Alert
            tone='warning'
            action={<AddAiKeyButton />}
            className={className}>
            {children}
        </Alert>
    )
}
