import { Navigate, useNavigate } from 'react-router'
import { AuthCard } from '~/components/auth/auth-card'
import { AuthLink } from '~/components/auth/auth-link'
import { SignupForm } from '~/components/auth/signup-form'
import { Alert } from '~/components/ui/alert'
import { CONNECTIONS_PATH, DASHBOARD_PATH, LOGIN_PATH } from '~/data/navigation'
import { useSignup } from '~/hooks/auth/mutations'
import { useSession } from '~/hooks/auth/use-session'

export default function Signup() {
    const navigate = useNavigate()
    const { session } = useSession()
    const {
        mutate: signup,
        isPending,
        data,
        variables,
    } = useSignup({
        onSuccess: (result) => {
            if (result.session) navigate(CONNECTIONS_PATH)
        },
    })

    if (session && !data) {
        return (
            <Navigate
                to={DASHBOARD_PATH}
                replace
            />
        )
    }

    return (
        <AuthCard
            title='Create your account'
            subtitle='Automated work reports from your git commits'
            footer={
                <>
                    Already have an account? <AuthLink to={LOGIN_PATH}>Sign in</AuthLink>
                </>
            }>
            {data && !data.session ? (
                <Alert tone='success'>
                    We sent a confirmation link to <strong>{variables?.email}</strong>. Open it to finish creating your
                    account.
                </Alert>
            ) : (
                <SignupForm
                    isPending={isPending}
                    onSubmit={(values) => signup(values)}
                />
            )}
        </AuthCard>
    )
}
