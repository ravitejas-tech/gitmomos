import { useState } from 'react'
import { AiKeyForm } from '~/components/ai-key/key-form'
import { AiModelsForm } from '~/components/ai-key/models-form'
import { SavedAiKey } from '~/components/ai-key/saved-key'
import { SettingsSection } from '~/components/settings/settings-section'
import { AI_KEY_SECTION_ID } from '~/data/ai-key/constants'
import { useLoadAiModels } from '~/hooks/ai-key/mutations'
import { useAiKey } from '~/hooks/ai-key/queries'

export function AiKeySection() {
    const { data: aiKey, isPending } = useAiKey()
    const { mutate: loadModels, data: catalog, variables: credentials, isPending: isLoading, reset } = useLoadAiModels()
    const [isReplacing, setIsReplacing] = useState(false)

    const renderContent = () => {
        if (catalog && credentials) {
            return (
                <AiModelsForm
                    credentials={credentials}
                    catalog={catalog}
                    aiKey={aiKey}
                    onBack={reset}
                    onSaved={() => {
                        reset()
                        setIsReplacing(false)
                    }}
                />
            )
        }
        if (aiKey && !isReplacing) {
            return (
                <SavedAiKey
                    aiKey={aiKey}
                    isLoadingModels={isLoading}
                    onChangeModels={() => loadModels({ provider: aiKey.provider })}
                    onReplace={() => setIsReplacing(true)}
                />
            )
        }
        return (
            <AiKeyForm
                defaultProvider={aiKey?.provider}
                isPending={isLoading}
                onSubmit={(data) => loadModels(data)}
                onCancel={aiKey ? () => setIsReplacing(false) : undefined}
            />
        )
    }

    return (
        <SettingsSection
            id={AI_KEY_SECTION_ID}
            title='AI provider'
            description='Writes your daily reports and answers questions on your public profile.'
            isLoading={isPending}>
            {renderContent()}
        </SettingsSection>
    )
}
