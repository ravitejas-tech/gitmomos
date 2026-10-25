import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiKeyGuide } from '~/components/ai-key/guide'
import { SettingsRow } from '~/components/settings/settings-row'
import { FieldError } from '~/components/ui/field-error'
import { FormActions } from '~/components/ui/form-actions'
import { PanelFooter } from '~/components/ui/panel-footer'
import { PasswordInput } from '~/components/ui/password-input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { AI_PROVIDER_OPTIONS, AI_PROVIDERS } from '~/data/ai-key/providers'
import { aiKeySchema, type AiKeyData } from '~/schemas/ai-key.schema'
import type { AiProvider } from '~/types/ai-key'

export interface AiKeyFormProps {
    defaultProvider?: AiProvider
    isPending: boolean
    onSubmit: (data: AiKeyData) => void
    onCancel?: () => void
}

export function AiKeyForm({ defaultProvider = 'gemini', isPending, onSubmit, onCancel }: AiKeyFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AiKeyData>({
        resolver: zodResolver(aiKeySchema),
        defaultValues: { provider: defaultProvider, apiKey: '' },
    })
    const provider = useWatch({ control, name: 'provider' })

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <SettingsRow label='Provider'>
                <Controller
                    control={control}
                    name='provider'
                    render={({ field }) => (
                        <SegmentedControl
                            label='Provider'
                            value={field.value}
                            options={AI_PROVIDER_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
            </SettingsRow>
            <SettingsRow
                label='API key'
                htmlFor='ai-key'
                description={errors.apiKey?.message && <FieldError>{errors.apiKey.message}</FieldError>}>
                <PasswordInput
                    id='ai-key'
                    autoComplete='off'
                    spellCheck={false}
                    placeholder={AI_PROVIDERS[provider].placeholder}
                    revealLabel='API key'
                    {...register('apiKey')}
                />
            </SettingsRow>
            <AiKeyGuide provider={provider} />
            <PanelFooter>
                <FormActions
                    submitLabel='Continue'
                    isPending={isPending}
                    onCancel={onCancel}
                />
            </PanelFooter>
        </form>
    )
}
