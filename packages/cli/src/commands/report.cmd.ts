import { note } from '@clack/prompts';
import pc from 'picocolors';

export const reportCommand = async () => {
    note(pc.blue('Fetching latest report...'));
    // TODO: Implement report fetch logic
    note(pc.yellow('Report generation in progress. Check back shortly.'));
};
