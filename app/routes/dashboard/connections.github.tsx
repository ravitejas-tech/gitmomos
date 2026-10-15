import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { GitHubCallbackStatus } from '~/components/connections/github-callback-status'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { CONNECTIONS_PATH } from '~/data/navigation'
import { useCompleteGitHub } from '~/hooks/connections/mutations'
import { githubCallbackError } from '~/lib/connections/github-callback'

export default function GitHubCallback() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const started = useRef(false)
    const { mutate: complete, error } = useCompleteGitHub()
    const paramError = githubCallbackError(params)
    const code = params.get('code')
    const state = params.get('state')

    useEffect(() => {
        if (paramError || !code || !state || started.current) return
        started.current = true
        complete({ code, state }, { onSuccess: () => navigate(CONNECTIONS_PATH, { replace: true }) })
    }, [code, state, paramError, complete, navigate])

    return (
        <DashboardPage
            title='Connecting GitHub'
            width='narrow'>
            <GitHubCallbackStatus error={paramError ?? error?.message ?? null} />
        </DashboardPage>
    )
}
