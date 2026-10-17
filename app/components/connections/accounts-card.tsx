import { AccountRow } from '~/components/connections/account-row'
import { ConnectActions } from '~/components/connections/connect-actions'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { PanelFooter } from '~/components/ui/panel-footer'
import type { Connection } from '~/types/connections'

export function AccountsCard({ connections }: { connections: Connection[] }) {
    return (
        <Card>
            <CardHeader title='Accounts' />
            <ul className='divide-y divide-border border-t border-border'>
                {connections.map((connection) => (
                    <AccountRow
                        key={connection.id}
                        connection={connection}
                    />
                ))}
            </ul>
            <PanelFooter>
                <ConnectActions />
            </PanelFooter>
        </Card>
    )
}
