import {
    GITHUB_API_URL,
    GITHUB_API_VERSION,
    GITHUB_PAGE_SIZE,
    MAX_BRANCHES,
    MAX_COMMIT_PAGES,
} from '../constants/providers.constants.ts'
import type { GitHubBranch, GitHubCommit, GitHubEmail, GitHubRepo, GitHubUser } from '../types/github.types.ts'
import type { CommitQuery, Provider, ProviderAccount, ProviderCommit, ProviderRepo } from '../types/provider.types.ts'
import { nullIfNotFound } from './null-if-not-found.ts'
import { request } from './request.ts'

export class GitHubProvider implements Provider {
    private headers: Record<string, string>

    constructor(token: string) {
        this.headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': GITHUB_API_VERSION,
        }
    }

    private get<T>(path: string) {
        return request<T>(`${GITHUB_API_URL}${path}`, this.headers)
    }

    async getAccount(): Promise<ProviderAccount> {
        const user = await this.get<GitHubUser>('/user')
        const emails = await this.get<GitHubEmail[]>('/user/emails').catch((): GitHubEmail[] => [])
        return {
            login: user.login,
            name: user.name ?? null,
            avatarUrl: user.avatar_url ?? null,
            emails: emails.filter((e) => e.verified).map((e) => String(e.email).toLowerCase()),
        }
    }

    async getRepo(fullName: string): Promise<ProviderRepo | null> {
        const repo = await nullIfNotFound(this.get<GitHubRepo>(`/repos/${fullName}`))
        return (
            repo && {
                externalId: String(repo.id),
                fullName: repo.full_name,
                htmlUrl: repo.html_url,
                defaultBranch: repo.default_branch ?? null,
                isPrivate: Boolean(repo.private),
                pushedAt: repo.pushed_at ?? null,
            }
        )
    }

    async listCommits(repo: string, { since, until, account }: CommitQuery): Promise<ProviderCommit[]> {
        const branches = await this.get<GitHubBranch[]>(`/repos/${repo}/branches?per_page=${MAX_BRANCHES}`)
        const seen = new Map<string, ProviderCommit>()

        for (const branch of branches) {
            for (let page = 1; page <= MAX_COMMIT_PAGES; page++) {
                const params = new URLSearchParams({
                    sha: branch.name,
                    author: account.login,
                    since: since.toISOString(),
                    until: until.toISOString(),
                    per_page: String(GITHUB_PAGE_SIZE),
                    page: String(page),
                })
                const batch = await this.get<GitHubCommit[]>(`/repos/${repo}/commits?${params}`)
                for (const c of batch) {
                    if (seen.has(c.sha)) continue
                    seen.set(c.sha, {
                        sha: c.sha,
                        message: String(c.commit.message).trim(),
                        authorName: c.commit.author?.name ?? null,
                        authorEmail: c.commit.author?.email ?? null,
                        committedAt: c.commit.committer?.date ?? c.commit.author.date,
                        htmlUrl: c.html_url ?? null,
                    })
                }
                if (batch.length < GITHUB_PAGE_SIZE) break
            }
        }
        return [...seen.values()]
    }
}
