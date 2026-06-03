import { createQuery } from 'react-query-kit';

export interface GitHubRelease {
    id: number;
    name: string;
    tag_name: string;
    body: string;
    created_at: string;
    published_at: string;
    html_url: string;
    author: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    prerelease: boolean;
}

export const useReleases = createQuery<GitHubRelease[]>({
    queryKey: ['github-releases'],
    fetcher: async () => {
        const response = await fetch('https://api.github.com/repos/ravitejas-tech/gitmomos/releases');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },
});
