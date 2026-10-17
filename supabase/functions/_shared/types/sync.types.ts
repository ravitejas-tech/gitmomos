import type { Enums, Tables } from '../database.types.ts'
import type { ProviderConnection } from './connections.types.ts'

export type SyncRepository = Pick<Tables<'repositories'>, 'id' | 'full_name'>

export type SyncConnection = ProviderConnection & {
    repositories: SyncRepository[]
}

export interface SyncOutcome {
    report: Enums<'report_status'> | 'kept_edited'
    errors: string[]
}

export interface SyncResult {
    date: string
    commitCount: number
    report: SyncOutcome['report'] | 'skipped'
    errors: string[]
}
