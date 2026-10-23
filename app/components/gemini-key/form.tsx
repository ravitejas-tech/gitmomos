import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GeminiKeyGuide } from '~/components/gemini-key/guide'
import { SettingsRow } from '~/components/settings/settings-row'
import { FieldError } from '~/components/ui/field-error'
import { FormActions } from '~/components/ui/form-actions'
import { PanelFooter } from '~/components/ui/panel-footer'
import { PasswordInput } from '~/components/ui/password-input'
import { GEMINI_KEY_PLACEHOLDER } from '~/data/gemini-key/constants'
import { useSaveGeminiKey } from '~/hooks/gemini-key/mutations'
import { geminiKeySchema, type GeminiKeyData } from '~/schemas/gemini-key.schema'

export function GeminiKeyForm({ onClose }: { onClose?: () => void }) {
    const { mutate: save, isPending } = useSaveGeminiKey()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GeminiKeyData>({ resolver: zodResolver(geminiKeySchema) })

    return (
        <form onSubmit={handleSubmit((data) => save(data, { onSuccess: () => onClose?.() }))}>
            <SettingsRow
                label='API key'
                htmlFor='gemini-key'
                description={errors.apiKey?.message && <FieldError>{errors.apiKey.message}</FieldError>}>
                <PasswordInput
                    id='gemini-key'
                    autoComplete='off'
                    spellCheck={false}
                    placeholder={GEMINI_KEY_PLACEHOLDER}
                    revealLabel='API key'
                    {...register('apiKey')}
                />
            </SettingsRow>
            <GeminiKeyGuide />
            <PanelFooter>
                <FormActions
                    submitLabel='Save key'
                    isPending={isPending}
                    onCancel={onClose}
                />
            </PanelFooter>
        </form>
    )
}
