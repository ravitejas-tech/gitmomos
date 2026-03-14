import { simpleGit, SimpleGit } from 'simple-git';

export class GitService {
    private git: SimpleGit = simpleGit();

    async getUserEmail() {
        const email = await this.git.getConfig('user.email');
        if (!email.value) throw new Error('Git user.email not configured locally.');
        return email.value;
    }

    async getRemoteUrl(remote = 'origin') {
        try {
            return await this.git.remote(['get-url', remote]);
        } catch (e) {
            return null;
        }
    }

    async getCommitsSince(hash?: string) {
        const email = await this.getUserEmail();
        
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const options: any = {
            '--author': email,
            '--since': todayStart.toISOString(),
        };

        if (hash) {
            options.from = hash;
            options.to = 'HEAD';
        }

        const logs = await this.git.log(options);
        return logs.all.map((c) => ({
            hash: c.hash,
            message: c.message,
            author_email: email,
            author_timestamp: c.date,
        }));
    }
}

export const gitService = new GitService();
