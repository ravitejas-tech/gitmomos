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
        const options: any = {
            '--author': email,
        };

        if (hash) {
            options.from = hash;
            options.to = 'HEAD';
        } else {
            options['--since'] = '7 days ago';
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
