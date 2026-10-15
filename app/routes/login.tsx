import { Navigate, useNavigate, useSearchParams } from 'react-router'
import { AuthCard } from '~/components/auth/auth-card'
import { AuthLink } from '~/components/auth/auth-link'
import { LoginForm } from '~/components/auth/login-form'
import { DASHBOARD_PATH, SIGNUP_PATH } from '~/data/navigation'
import { useSession } from '~/hooks/auth/use-session'
import { safeInternalPath } from '~/lib/safe-path'

export default function Login() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const { session } = useSession()
    const next = safeInternalPath(params.get('next'), DASHBOARD_PATH)

    if (session) {
        return (
            <Navigate
                to={next}
                replace
            />
        )
    }

    return (
        <AuthCard
            title='Log in to gitmomos'
            subtitle='Welcome back. Your reports are waiting.'
            footer={
                <>
                    Don’t have an account? <AuthLink to={SIGNUP_PATH}>Sign up</AuthLink>
                </>
            }>
            <LoginForm onSignedIn={() => navigate(next, { replace: true })} />
        </AuthCard>
    )
}
