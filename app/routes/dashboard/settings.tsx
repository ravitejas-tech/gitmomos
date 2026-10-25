import { AiKeySection } from '~/components/ai-key/section'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { AppearanceSection } from '~/components/settings/appearance-section'
import { PasswordSection } from '~/components/settings/password-section'
import { ProfileSection } from '~/components/settings/profile-section'

export default function Settings() {
    return (
        <DashboardPage
            title='Settings'
            width='narrow'>
            <div className='space-y-8'>
                <ProfileSection />
                <AiKeySection />
                <AppearanceSection />
                <PasswordSection />
            </div>
        </DashboardPage>
    )
}
