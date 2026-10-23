import { SettingsRow } from '~/components/settings/settings-row'
import { Button } from '~/components/ui/button'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Text } from '~/components/ui/text'
import { GEMINI_KEY_MASK } from '~/data/gemini-key/constants'
import { useRemoveGeminiKey } from '~/hooks/gemini-key/mutations'
import { timeAgo } from '~/lib/format'
import type { GeminiKey } from '~/types/gemini-key'

export interface SavedGeminiKeyProps {
    geminiKey: GeminiKey
    onReplace: () => void
}

export function SavedGeminiKey({ geminiKey, onReplace }: SavedGeminiKeyProps) {
    const { mutate: remove, isPending } = useRemoveGeminiKey()

    const confirmRemove = () => {
        if (window.confirm('Remove your Gemini API key? New reports won’t be written until you add one again.')) {
            remove()
        }
    }

    return (
        <>
            <SettingsRow
                label='API key'
                description={`Saved ${timeAgo(geminiKey.updated_at)}`}>
                <Text
                    as='code'
                    variant='code'
                    tone='secondary'>
                    {GEMINI_KEY_MASK}
                    {geminiKey.hint}
                </Text>
            </SettingsRow>
            <PanelFooter className='flex justify-end gap-3'>
                <Button
                    variant='danger'
                    onClick={confirmRemove}
                    disabled={isPending}>
                    Remove
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
