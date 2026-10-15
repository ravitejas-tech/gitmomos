export interface ProviderAccount {
    login: string
    name: string | null
    avatarUrl: string | null
    emails: string[]
}

export interface ProviderRepo {
    externalId: string
    fullName: string
    htmlUrl: string
    defaultBranch: string | null
    isPrivate: boolean
    pushedAt: string | null
}

export interface ProviderCommit {
    sha: string
    message: string
    authorName: string | null
    authorEmail: string | null
    committedAt: string
    htmlUrl: string | null
}

export interface CommitWindow {
    since: Date
    until: Date
}

export interface CommitQuery extends CommitWindow {
    account: ProviderAccount
}

export interface Provider {
    getAccount(): Promise<ProviderAccount>
    listRepos(): Promise<ProviderRepo[]>
    listCommits(repoFullName: string, query: CommitQuery): Promise<ProviderCommit[]>
}
