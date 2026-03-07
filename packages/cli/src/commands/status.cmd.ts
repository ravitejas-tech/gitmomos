import { note } from '@clack/prompts';
import pc from 'picocolors';
import { authService } from '../services/auth.service';

export const statusCommand = async () => {
    const authed = await authService.isAuthenticated();
    if (authed) {
        note(pc.green('Authenticated: Yes'));
    } else {
        note(pc.red('Authenticated: No (Run gitmomos login)'));
    }
};
