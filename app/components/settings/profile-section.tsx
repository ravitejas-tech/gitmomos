import { ProfileForm } from '~/components/settings/profile-form'
import { SettingsSection } from '~/components/settings/settings-section'
import { Skeleton } from '~/components/ui/skeleton'
import { useProfile } from '~/hooks/profile/queries'

export function ProfileSection() {
    const { data: profile } = useProfile()

    return (
        <SettingsSection
            title='Profile'
            description={profile?.email}>
            {profile ? (
                <ProfileForm
                    key={profile.id}
                    profile={profile}
                />
            ) : (
                <Skeleton className='m-4 h-24' />
            )}
        </SettingsSection>
    )
}
