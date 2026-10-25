import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsRow } from '~/components/settings/settings-row'
import { FormActions } from '~/components/ui/form-actions'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Select } from '~/components/ui/select'
import { AI_MODEL_FIELDS } from '~/data/ai-key/constants'
import { useSaveAiKey } from '~/hooks/ai-key/mutations'
import { defaultModel } from '~/lib/ai-key/default-model'
import { aiModelsSchema, type AiModelsData } from '~/schemas/ai-key.schema'
import type { AiCredentials, AiKey, AiModelCatalog } from '~/types/ai-key'

export interface AiModelsFormProps {
    credentials: AiCredentials
    catalog: AiModelCatalog
    aiKey?: AiKey | null
    onBack: () => void
    onSaved: () => void
}

export function AiModelsForm({ credentials, catalog, aiKey, onBack, onSaved }: AiModelsFormProps) {
    const { mutate: save, isPending } = useSaveAiKey()
    const saved = aiKey?.provider === credentials.provider ? aiKey : undefined
    const { register, handleSubmit } = useForm<AiModelsData>({
        resolver: zodResolver(aiModelsSchema),
        defaultValues: {
            reportModel: defaultModel(catalog, 'report', saved?.report_model),
            chatModel: defaultModel(catalog, 'chat', saved?.chat_model),
        },
    })
    const options = catalog.models.map(({ id, name }) => ({ value: id, label: name }))

    return (
        <form onSubmit={handleSubmit((models) => save({ ...credentials, ...models }, { onSuccess: onSaved }))}>
            {AI_MODEL_FIELDS.map(({ name, label, description }) => (
                <SettingsRow
                    key={name}
                    label={label}
                    htmlFor={name}
                    description={description}>
                    <Select
                        id={name}
                        options={options}
                        {...register(name)}
                    />
                </SettingsRow>
            ))}
            <PanelFooter>
                <FormActions
                    submitLabel='Save'
                    isPending={isPending}
                    onCancel={onBack}
                    cancelLabel='Back'
                />
            </PanelFooter>
        </form>
    )
}
