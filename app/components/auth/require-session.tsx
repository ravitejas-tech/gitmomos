import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { LoadingState } from '~/components/ui/loading-state'
import { useSession } from '~/hooks/auth/use-session'
import { loginPath } from '~/lib/auth/login-path'

export function RequireSession({ children }: { children: ReactNode }) {
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

    return children
}
