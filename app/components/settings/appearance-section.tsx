import { SettingsRow } from '~/components/settings/settings-row'
import { SettingsSection } from '~/components/settings/settings-section'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { THEME_OPTIONS } from '~/data/ui/theme'
import { useTheme } from '~/hooks/use-theme'

export function AppearanceSection() {
    const { preference, setPreference } = useTheme()

    return (
        <SettingsSection title='Appearance'>
            <SettingsRow
                label='Theme'
                description='System follows your device setting.'>
                <SegmentedControl
                    label='Theme'
                    value={preference}
                    options={THEME_OPTIONS}
                    onChange={setPreference}
                />
            </SettingsRow>
        </SettingsSection>
    )
}
