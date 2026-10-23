import { ProfileBanner } from '~/components/public-profile/banner'
import { ProfileMediaField } from '~/components/public-profile/settings/media-field'
import { SettingsSection } from '~/components/settings/settings-section'
import { Avatar } from '~/components/ui/avatar'
import { useProfile } from '~/hooks/profile/queries'

export function ProfileMediaSection() {
    const { data: profile } = useProfile()

    return (
        <SettingsSection
            title='Images'
            description='Shown at the top of your public profile.'
            isLoading={!profile}>
            {profile && (
                <>
                    <ProfileMediaField
                        kind='avatar'
                        hasImage={Boolean(profile.avatar_path)}
                        preview={
                            <Avatar
                                name={profile.full_name || profile.email}
                                src={profile.avatar_url}
                                size='lg'
                                tone='solid'
                            />
                        }
                    />
                    <ProfileMediaField
                        kind='banner'
                        hasImage={Boolean(profile.banner_path)}
                        preview={
                            <ProfileBanner
                                src={profile.banner_url}
                                size='preview'
                            />
                        }
                    />
                </>
            )}
        </SettingsSection>
    )
}
