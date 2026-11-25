import { GitBranch } from 'lucide-react'
import { ConnectActions } from '~/components/connections/accounts/connect-actions'
import { EmptyState } from '~/components/ui/empty-state'

export function AccountsEmptyState() {
    return (
        <EmptyState
            icon={GitBranch}
            title='No accounts connected'
            description='Connect GitHub or Gitea to add the repositories your reports cover.'
            action={<ConnectActions />}
        />
    )
}
