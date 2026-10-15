import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'

export interface FormActionsProps {
    submitLabel: string
    isPending: boolean
    onCancel?: () => void
    cancelLabel?: string
}

export function FormActions({ submitLabel, isPending, onCancel, cancelLabel = 'Cancel' }: FormActionsProps) {
    return (
        <div className='flex items-center justify-end gap-3'>
            {onCancel && (
                <Button
                    type='button'
                    variant='ghost'
                    onClick={onCancel}>
                    {cancelLabel}
                </Button>
            )}
            <Button
                type='submit'
                disabled={isPending}>
                {isPending && <Spinner />}
                {submitLabel}
            </Button>
        </div>
    )
}
