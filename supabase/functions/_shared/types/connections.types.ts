import type { Tables } from '../database.types.ts'
import type { ConnectionsRequest } from '../schemas/connections.schema.ts'

export type ConnectionsAction = ConnectionsRequest['action']

export type ConnectionsRequestOf<A extends ConnectionsAction> = Extract<ConnectionsRequest, { action: A }>

export type ConnectionsHandlers = {
    [A in ConnectionsAction]: (userId: string, body: ConnectionsRequestOf<A>) => Promise<unknown>
}

export type ProviderConnection = Pick<Tables<'connections'>, 'id' | 'provider' | 'base_url'>

export type AccountConnection = ProviderConnection & Pick<Tables<'connections'>, 'account_login'>
