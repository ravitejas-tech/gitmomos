import { AccountsCard } from '~/components/connections/accounts/card'
import { AccountsEmptyState } from '~/components/connections/accounts/empty-state'
import { useConnections } from '~/hooks/connections/queries'

export function ConnectStep() {
    const { data: connections } = useConnections()

    return connections?.length ? <AccountsCard connections={connections} /> : <AccountsEmptyState />
}
