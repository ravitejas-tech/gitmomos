import { note, spinner } from '@clack/prompts';
import pc from 'picocolors';
import { gitService } from '../services/git.service';
import { getSupabaseClient } from '@gitmomos/shared';
import { config } from '../utils/config';
import { authService } from '../services/auth.service';

export const addCommand = async (name: string) => {
    const authed = await authService.isAuthenticated();
    if (!authed) {
        note(pc.red('Not authenticated. Please run gitmomos login.'));
        return;
    }

    const remoteUrl = await gitService.getRemoteUrl();
    if (!remoteUrl) {
        note(pc.red('No git remote found in this directory.'));
        return;
    }

    const s = spinner();
    s.start('Linking project to cloud...');

    const supabase = getSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);

    try {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) throw new Error('User not found.');

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
        note(pc.blue(`Project: ${project.name}\nRemote: ${project.remoteUrl}`));
    } catch (err: any) {
        s.stop(pc.red('Failed to link project.'));
        note(err.message);
    }
};
