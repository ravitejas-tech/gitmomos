import { note, spinner } from '@clack/prompts';
import pc from 'picocolors';
import { gitService } from '../services/git.service';
import { getSupabaseClient } from '@gitmomos/shared';
import { config } from '../utils/config';
import { authService } from '../services/auth.service';
import { getSession } from '../store/session';

export const addCommand = async (name: string): Promise<boolean> => {
    const authed = await authService.isAuthenticated();
    if (!authed) {
        note(pc.red('Not authenticated. Please run gitmomos login.'));
        return false;
    }

    const remoteUrl = await gitService.getRemoteUrl();
    if (!remoteUrl) {
        note(pc.red('No git remote found in this directory.'));
        return false;
    }

    const s = spinner();
    s.start('Linking project to cloud...');

    try {
        const sessionStr = await getSession();
        if (!sessionStr) throw new Error('Session not found. Please run gitmomos login.');

        const session = JSON.parse(sessionStr);
        const supabase = getSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
        await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
        });

        const { data: user } = await supabase.auth.getUser();
        if (!user.user) throw new Error('User not found. Please run gitmomos login again.');

        const emailPrefix = user.user.email?.split('@')[0] ?? 'user';
        const { error: profileError } = await supabase.from('profiles').upsert({
            id: user.user.id,
            email: user.user.email,
            username: emailPrefix,
        }, { onConflict: 'id' });

        if (profileError) throw new Error(`Profile setup failed: ${profileError.message}`);

        const { data: project, error: pError } = await supabase
            .from('projects')
            .upsert({
                user_id: user.user.id,
                name: name,
                remote_url: remoteUrl.trim(),
            }, { onConflict: 'user_id, remote_url' })
            .select()
            .single();

        if (pError) throw pError;

        s.stop(pc.green('Project linked successfully!'));
        note(pc.blue(`Project: ${project.name}\nRemote: ${project.remote_url}`));

        const fs = await import('fs/promises');
        const path = await import('path');
        const configPath = path.join(process.cwd(), '.gitmomos');

        await fs.writeFile(configPath, JSON.stringify({ projectId: project.id }, null, 2));
        note(pc.green(`Saved project config to ${configPath}`));

        return true;

    } catch (err: any) {
        s.stop(pc.red('Failed to link project.'));
        note(err.message);
        return false;
    }
};
