import { authService } from './auth.service';
import { gitService } from './git.service';
import { logger } from '../utils/logger';
import { getSupabaseClient } from '@gitmomos/shared';
import { config } from '../utils/config';

export class SyncService {
    private _supabase: any;

    private get supabase() {
        if (!this._supabase) {
            this._supabase = getSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
        }
        return this._supabase;
    }

    async sync() {
        const authed = await authService.isAuthenticated();
        if (!authed) throw new Error('Not authenticated. Please run gitmomos login.');

        const remoteUrl = await gitService.getRemoteUrl();
        if (!remoteUrl) throw new Error('No git remote found.');

        // 1. Get project
        const { data: project, error: pError } = await this.supabase
            .from('projects')
            .select('id')
            .eq('remote_url', remoteUrl.trim())
            .single();

        if (pError || !project) {
            throw new Error('Project not found. Please run gitmomos add "ProjectName" first.');
        }

        // 2. Get last sync state
        const { data: syncState } = await this.supabase
            .from('sync_state')
            .select('last_synced_hash')
            .eq('project_id', project.id)
            .single();

        const lastHash = syncState?.last_synced_hash;

        // 3. Extract commits
        logger.info(lastHash ? `Finding commits since ${lastHash.slice(0, 7)}...` : 'Extracting last 7 days of commits...');
        const commits = await gitService.getCommitsSince(lastHash);

        if (commits.length === 0) {
            logger.success('No new commits to sync.');
            return [];
        }

        // 4. Batch push commits via Edge Function Ingestion Pipeline
        logger.info(`Syncing ${commits.length} commits via ingestion pipeline...`);
        
        const { data: response, error: ingestError } = await this.supabase.functions.invoke('ingest-commits', {
            body: {
                projectId: project.id,
                commits: commits
            }
        });

        if (ingestError || response?.error) {
            throw new Error(ingestError?.message || response?.error || 'Sync failed.');
        }

        logger.success(`Successfully synced ${commits.length} commits.`);
        return commits;
    }
}

export const syncService = new SyncService();
