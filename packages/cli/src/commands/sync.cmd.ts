import { intro, outro, spinner, note } from '@clack/prompts';
import pc from 'picocolors';
import { syncService } from '../services/sync.service';

export const syncCommand = async () => {
    const s = spinner();
    s.start('Syncing commits to cloud...');
    
    try {
        const commits = await syncService.sync();
        if (commits.length > 0) {
            s.stop(pc.green(`Sync complete! ${commits.length} new commits pushed to cloud.`));
        } else {
            s.stop(pc.blue('No new commits to sync.'));
        }
    } catch (err: any) {
        s.stop(pc.red('Sync failed!'));
        note(err.message);
    }
};
