import {
    GITEA_MAX_REPO_PAGES,
    GITEA_PAGE_SIZE,
    MAX_BRANCHES,
    MAX_COMMIT_PAGES,
} from '../constants/providers.constants.ts'
import type { GiteaBranch, GiteaCommit, GiteaEmail, GiteaRepo, GiteaUser } from '../types/gitea.types.ts'
import type { CommitQuery, Provider, ProviderAccount, ProviderCommit, ProviderRepo } from '../types/provider.types.ts'
import { request } from './request.ts'

export class GiteaProvider implements Provider {
    private api: string
    private headers: Record<string, string>

    constructor(baseUrl: string, token: string) {
        this.api = `${baseUrl}/api/v1`
        this.headers = { Authorization: `token ${token}`, Accept: 'application/json' }
    }

    private get<T>(path: string) {
        return request<T>(`${this.api}${path}`, this.headers)
    }

    async getAccount(): Promise<ProviderAccount> {
        const user = await this.get<GiteaUser>('/user')
        const emails = await this.get<GiteaEmail[]>('/user/emails').catch((): GiteaEmail[] => [])
        const all = new Set(emails.map((e) => String(e.email).toLowerCase()))
        if (user.email) all.add(String(user.email).toLowerCase())
        return {
            login: user.login,
            name: user.full_name || null,
            avatarUrl: user.avatar_url ?? null,
            emails: [...all],
        }
    }

    async listRepos(): Promise<ProviderRepo[]> {
        const repos: ProviderRepo[] = []
        for (let page = 1; page <= GITEA_MAX_REPO_PAGES; page++) {
            const batch = await this.get<GiteaRepo[]>(`/user/repos?limit=${GITEA_PAGE_SIZE}&page=${page}`)
            repos.push(
                ...batch.map((r) => ({
                    externalId: String(r.id),
                    fullName: r.full_name,
                    htmlUrl: r.html_url,
                    defaultBranch: r.default_branch ?? null,
                    isPrivate: Boolean(r.private),
                    pushedAt: r.updated_at ?? null,
                })),
            )
            if (batch.length < GITEA_PAGE_SIZE) break
        }
        return repos
    }

    async listCommits(repo: string, { since, until, account }: CommitQuery): Promise<ProviderCommit[]> {
        const emails = new Set(account.emails)
        const isMine = (c: GiteaCommit) =>
            c.author?.login === account.login || emails.has(String(c.commit.author?.email ?? '').toLowerCase())

        const seen = new Map<string, ProviderCommit>()
        for (const branch of await this.listBranches(repo)) {
            const head = branch.commit?.timestamp ? new Date(branch.commit.timestamp) : null
            if (head && head < since) continue

            for (let page = 1; page <= MAX_COMMIT_PAGES; page++) {
                const params = new URLSearchParams({
                    sha: branch.name,
                    since: since.toISOString(),
                    until: until.toISOString(),
                    limit: String(GITEA_PAGE_SIZE),
                    page: String(page),
                    stat: 'false',
                    verification: 'false',
                    files: 'false',
                })
                const batch = await this.get<GiteaCommit[]>(`/repos/${repo}/commits?${params}`)
                let reachedOlder = false

                for (const c of batch) {
                    const committedAt = c.commit.committer?.date ?? c.commit.author?.date ?? c.created
                    const when = new Date(committedAt)
                    if (when < since) {
                        reachedOlder = true
                        continue
                    }
                    if (when >= until || seen.has(c.sha) || !isMine(c)) continue
                    seen.set(c.sha, {
                        sha: c.sha,
                        message: String(c.commit.message).trim(),
                        authorName: c.commit.author?.name ?? null,
                        authorEmail: c.commit.author?.email ?? null,
                        committedAt,
                        htmlUrl: c.html_url ?? null,
                    })
                }
                if (batch.length < GITEA_PAGE_SIZE || reachedOlder) break
            }
        }
        return [...seen.values()]
    }

    private async listBranches(repo: string): Promise<GiteaBranch[]> {
        const branches: GiteaBranch[] = []
        for (let page = 1; branches.length < MAX_BRANCHES; page++) {
            const batch = await this.get<GiteaBranch[]>(`/repos/${repo}/branches?limit=${GITEA_PAGE_SIZE}&page=${page}`)
            branches.push(...batch)
            if (batch.length < GITEA_PAGE_SIZE) break
        }
        return branches
    }
}
