import { Navigate, Outlet, useLocation } from 'react-router'
import { Sidebar } from '~/components/layout/sidebar'
import { LoadingState } from '~/components/ui/loading-state'
import { LOGIN_PATH } from '~/data/navigation'
import { useSession } from '~/hooks/auth/use-session'

export default function DashboardLayout() {
    const { session, isLoading } = useSession()
    const { pathname, search } = useLocation()

    if (isLoading) return <LoadingState fullScreen />

    if (!session) {
        return (
            <Navigate
                to={`${LOGIN_PATH}?next=${encodeURIComponent(pathname + search)}`}
                replace
            />
        )
    }

    return (
        <div className='min-h-screen bg-bg md:flex print:bg-surface'>
            <Sidebar />
            <main className='min-w-0 flex-1'>
                <Outlet />
            </main>
        </div>
    )
}
