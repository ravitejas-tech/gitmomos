import { SettingsRow } from '~/components/settings/settings-row'
import { Button } from '~/components/ui/button'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { AI_KEY_MASK, AI_MODEL_FIELDS } from '~/data/ai-key/constants'
import { AI_PROVIDERS } from '~/data/ai-key/providers'
import { useRemoveAiKey } from '~/hooks/ai-key/mutations'
import { timeAgo } from '~/lib/format'
import type { AiKey } from '~/types/ai-key'

export interface SavedAiKeyProps {
    aiKey: AiKey
    isLoadingModels: boolean
    onChangeModels: () => void
    onReplace: () => void
}

export function SavedAiKey({ aiKey, isLoadingModels, onChangeModels, onReplace }: SavedAiKeyProps) {
    const { mutate: remove, isPending } = useRemoveAiKey()
    const { label } = AI_PROVIDERS[aiKey.provider]

    const confirmRemove = () => {
        if (window.confirm(`Remove your ${label} API key? New reports won’t be written until you add one again.`)) {
            remove()
        }
    }

    return (
        <>
            <SettingsRow label='Provider'>
                <Text variant='strong'>{label}</Text>
            </SettingsRow>
            {AI_MODEL_FIELDS.map(({ name, column, label: fieldLabel }) => (
                <SettingsRow
                    key={name}
                    label={fieldLabel}>
                    <Text
                        as='code'
                        variant='code'
                        tone='secondary'>
                        {aiKey[column]}
                    </Text>
                </SettingsRow>
            ))}
            <SettingsRow
                label='API key'
                description={`Saved ${timeAgo(aiKey.updated_at)}`}>
                <Text
                    as='code'
                    variant='code'
                    tone='secondary'>
                    {AI_KEY_MASK}
                    {aiKey.hint}
                </Text>
            </SettingsRow>
            <PanelFooter className='flex flex-wrap justify-end gap-3'>
                <Button
                    variant='danger'
                    onClick={confirmRemove}
                    disabled={isPending}>
                    Remove
                </Button>
                <Button
                    variant='secondary'
                    onClick={onChangeModels}
                    disabled={isLoadingModels}>
                    {isLoadingModels && <Spinner />}
                    Change models
                </Button>
                <Button
                    variant='secondary'
                    onClick={onReplace}>
                    Replace key
                </Button>
            </PanelFooter>
        </>
    )
}
