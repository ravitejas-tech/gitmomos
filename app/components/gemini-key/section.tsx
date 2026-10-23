import { useState } from 'react'
import { GeminiKeyForm } from '~/components/gemini-key/form'
import { SavedGeminiKey } from '~/components/gemini-key/saved-key'
import { SettingsSection } from '~/components/settings/settings-section'
import { GEMINI_KEY_SECTION_ID } from '~/data/gemini-key/constants'
import { useGeminiKey } from '~/hooks/gemini-key/queries'

export function GeminiKeySection() {
    const { data: geminiKey, isPending } = useGeminiKey()
    const [isReplacing, setIsReplacing] = useState(false)

    return (
        <SettingsSection
            id={GEMINI_KEY_SECTION_ID}
            title='Gemini API key'
            description='Writes your daily reports and answers questions on your public profile.'
            isLoading={isPending}>
            {geminiKey && !isReplacing ? (
                <SavedGeminiKey
                    geminiKey={geminiKey}
                    onReplace={() => setIsReplacing(true)}
                />
            ) : (
                <GeminiKeyForm onClose={geminiKey ? () => setIsReplacing(false) : undefined} />
            )}
        </SettingsSection>
    )
}
