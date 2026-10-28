import { Navigate, Outlet, useLocation } from 'react-router'
import { DashboardTopbar } from '~/components/layout/dashboard-topbar'
import { Sidebar } from '~/components/layout/sidebar'
import { LoadingState } from '~/components/ui/loading-state'
import { useSession } from '~/hooks/auth/use-session'
import { loginPath } from '~/lib/auth/login-path'

export default function DashboardLayout() {
    const { session, isLoading } = useSession()
    const { pathname, search } = useLocation()

    if (isLoading) return <LoadingState fullScreen />

    if (!session) {
        return (
            <Navigate
                to={loginPath(pathname + search)}
                replace
            />
        )
    }

    return (
        <div className='min-h-screen bg-bg md:flex print:bg-surface'>
            <Sidebar />
            <div className='min-w-0 flex-1'>
                <DashboardTopbar />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
