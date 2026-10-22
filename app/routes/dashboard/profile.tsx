import { DashboardPage } from '~/components/layout/dashboard-page'
import { PublicProfileForm } from '~/components/public-profile/settings/form'
import { ProfileLinkActions } from '~/components/public-profile/settings/link-actions'
import { ProfileRepositories } from '~/components/public-profile/settings/repositories'
import { SettingsSection } from '~/components/settings/settings-section'
import { useProfile } from '~/hooks/profile/queries'

export default function PublicProfileSettings() {
    const { data: profile } = useProfile()

    return (
        <DashboardPage
            title='Public profile'
            width='narrow'
            actions={profile?.is_public && profile.handle && <ProfileLinkActions handle={profile.handle} />}>
            <div className='space-y-8'>
                <SettingsSection
                    title='Profile'
                    isLoading={!profile}>
                    {profile && (
                        <PublicProfileForm
                            key={profile.id}
                            profile={profile}
                        />
                    )}
                </SettingsSection>
                <ProfileRepositories />
            </div>
        </DashboardPage>
    )
}
