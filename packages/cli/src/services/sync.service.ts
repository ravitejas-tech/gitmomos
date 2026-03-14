import { authService } from './auth.service';
import { gitService } from './git.service';
import { logger } from '../utils/logger';
import { getSupabaseClient } from '@gitmomos/shared';
import { config } from '../utils/config';
import { getSession } from '../store/session';

export class SyncService {
    private async getAuthenticatedClient() {
        const sessionStr = await getSession();
        if (!sessionStr) throw new Error('Session not found. Please run gitmomos login.');

        const session = JSON.parse(sessionStr);
        const supabase = getSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
        await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
        });
        return supabase;
    }

    async sync() {
        const authed = await authService.isAuthenticated();
        if (!authed) throw new Error('Not authenticated. Please run gitmomos login.');

        const remoteUrl = await gitService.getRemoteUrl();
        if (!remoteUrl) throw new Error('No git remote found.');

        const supabase = await this.getAuthenticatedClient();

        const fs = await import('fs/promises');
        const path = await import('path');
        const configPath = path.join(process.cwd(), '.gitmomos');

        let projectId: string;
        try {
            const configFile = await fs.readFile(configPath, 'utf-8');
            const configData = JSON.parse(configFile);
            projectId = configData.projectId;
            if (!projectId) throw new Error('Invalid .gitmomos');
        } catch (err) {
            throw new Error('Project not found locally. Please run gitmomos add "ProjectName" first to link this directory.');
        }

        const { data: project, error: pError } = await supabase
            .from('projects')
            .select('id')
            .eq('id', projectId)
            .single();

        if (pError || !project) {
            throw new Error('Project ID from .gitmomos not found in the database. Please re-run gitmomos add.');
        }

        const { data: syncState } = await supabase
            .from('sync_state')
            .select('last_synced_hash')
            .eq('project_id', project.id)
            .single();

        const lastHash = syncState?.last_synced_hash;

        logger.info(lastHash ? `Finding commits since ${lastHash.slice(0, 7)}...` : 'Extracting last 7 days of commits...');
        const commits = await gitService.getCommitsSince(lastHash);

        if (commits.length === 0) {
            logger.success('No new commits to sync.');
            return [];
        }

        logger.info(`Syncing ${commits.length} commits via ingestion pipeline...`);

        const sessionStr = await getSession();
        const sessionData = JSON.parse(sessionStr!);

        const { data: response, error: ingestError } = await supabase.functions.invoke('ingest-commits', {
            body: {
                projectId: project.id,
                commits: commits
            },
            headers: {
                Authorization: `Bearer ${sessionData.access_token}`,
            },
        });

        if (ingestError) {
            let detail = ingestError.message;
            try {
                const body = await (ingestError as any).context?.json?.();
                if (body?.error) detail = body.error;
            } catch (_) {}
            throw new Error(`Edge Function error: ${detail}`);
        }

        if (response?.error) {
            throw new Error(`Ingest error: ${response.error}`);
        }

        logger.success(`Successfully synced ${commits.length} commits.`);
        return commits;
    }
}

export const syncService = new SyncService();
