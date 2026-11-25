import { PublicProfileForm } from '~/components/public-profile/settings/form'
import { SettingsSection, type SettingsSectionProps } from '~/components/settings/settings-section'
import { useProfile } from '~/hooks/profile/queries'

export function PublicProfileSection({ layout }: Pick<SettingsSectionProps, 'layout'>) {
    const { data: profile } = useProfile()

    return (
        <SettingsSection
            title='Profile'
            isLoading={!profile}
            layout={layout}>
            {profile && (
                <PublicProfileForm
                    key={profile.id}
                    profile={profile}
                />
            )}
        </SettingsSection>
    )
}
