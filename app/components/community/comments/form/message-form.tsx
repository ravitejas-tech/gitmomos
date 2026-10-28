import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '~/components/ui/field-error'
import { FormActions } from '~/components/ui/form-actions'
import { Textarea } from '~/components/ui/textarea'
import { COMMENT_MAX_LENGTH } from '~/data/community/constants'
import { messageFormSchema, type MessageFormData } from '~/schemas/community.schema'

export interface MessageFormProps {
    label: string
    defaultValue: string
    submitLabel: string
    isPending: boolean
    onSubmit: (text: string) => void
    placeholder?: string
    autoFocus?: boolean
    onCancel?: () => void
    secondaryAction?: ReactNode
    className?: string
}

export function MessageForm({
    label,
    defaultValue,
    submitLabel,
    isPending,
    onSubmit,
    placeholder,
    autoFocus,
    onCancel,
    secondaryAction,
    className,
}: MessageFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MessageFormData>({
        resolver: zodResolver(messageFormSchema),
        defaultValues: { text: defaultValue },
    })

    return (
        <form
            noValidate
            className={className}
            onSubmit={handleSubmit(({ text }) => onSubmit(text))}>
            <div className='space-y-3'>
                <Textarea
                    rows={3}
                    aria-label={label}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    maxLength={COMMENT_MAX_LENGTH}
                    {...register('text')}
                />
                {errors.text && <FieldError>{errors.text.message}</FieldError>}
                <div className='flex items-center justify-end gap-3'>
                    {secondaryAction}
                    <FormActions
                        submitLabel={submitLabel}
                        isPending={isPending}
                        onCancel={onCancel}
                    />
                </div>
            </div>
        </form>
    )
}
