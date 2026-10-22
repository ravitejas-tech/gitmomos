import { ProfileForm } from '~/components/settings/profile-form'
import { SettingsSection } from '~/components/settings/settings-section'
import { useProfile } from '~/hooks/profile/queries'

export function ProfileSection() {
    const { data: profile } = useProfile()

    return (
        <SettingsSection
            title='Profile'
            description={profile?.email}
            isLoading={!profile}>
            {profile && (
                <ProfileForm
                    key={profile.id}
                    profile={profile}
                />
            )}
        </SettingsSection>
    )
}
