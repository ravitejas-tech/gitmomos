import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { GiteaConnectionData } from '~/schemas/connection.schema'
import type { AddRepositoryResult, ConnectResult } from '~/types/connections'

export const connectionsService = {
    async getConnections() {
        const { data, error } = await supabase
            .from('connections')
            .select(
                'id, provider, base_url, account_login, account_name, avatar_url, status, last_error, last_synced_at, created_at',
            )
            .order('created_at')
        if (error) throw error
        return data
    },

    async getRepositories() {
        const { data, error } = await supabase
            .from('repositories')
            .select('id, full_name, html_url, is_private, on_profile, last_synced_at, connection:connections(provider)')
            .eq('enabled', true)
            .order('full_name')
        if (error) throw error
        return data
    },

    addRepository(url: string) {
        return invokeFunction<AddRepositoryResult>('connections', { action: 'add_repository', url })
    },

    async untrackRepository(id: string) {
        const { error } = await supabase.from('repositories').update({ enabled: false }).eq('id', id)
        if (error) throw error
    },

    async startGitHub() {
        const { url } = await invokeFunction<{ url: string }>('connections', { action: 'github_start' })
        return url
    },

    completeGitHub({ code, state }: { code: string; state: string }) {
        return invokeFunction<ConnectResult>('connections', { action: 'github_callback', code, state })
    },

    connectGitea({ baseUrl, token }: GiteaConnectionData) {
        return invokeFunction<ConnectResult>('connections', { action: 'gitea_connect', baseUrl, token })
    },

    async disconnect(connectionId: string) {
        const { error } = await supabase.from('connections').delete().eq('id', connectionId)
        if (error) throw error
    },
}
