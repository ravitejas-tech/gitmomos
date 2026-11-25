import { Outlet } from 'react-router'
import { RequireSession } from '~/components/auth/require-session'
import { DashboardTopbar } from '~/components/layout/dashboard-topbar'
import { Sidebar } from '~/components/layout/sidebar'
import { OnboardingGate } from '~/components/onboarding/gate'

export default function DashboardLayout() {
    return (
        <RequireSession>
            <OnboardingGate>
                <div className='min-h-screen bg-bg md:flex print:bg-surface'>
                    <Sidebar />
                    <div className='min-w-0 flex-1'>
                        <DashboardTopbar />
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </OnboardingGate>
        </RequireSession>
    )
}
