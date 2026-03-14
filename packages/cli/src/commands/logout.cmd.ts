import { note, spinner } from '@clack/prompts';
import { authService } from '../services/auth.service';
import pc from 'picocolors';

export const logoutCommand = async () => {
    const s = spinner();
    s.start('Logging out...');

    try {
        await authService.logout();
        s.stop(pc.green('Successfully logged out.'));
        note('Your session has been cleared from this machine.');
    } catch (err: any) {
        s.stop(pc.red('Logout failed!'));
        note(err.message);
    }
};
