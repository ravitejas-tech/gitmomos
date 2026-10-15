export interface GitHubTokenResponse {
    access_token?: string
    error_description?: string
}

export interface GitHubUser {
    login: string
    name?: string | null
    avatar_url?: string | null
}

export interface GitHubEmail {
    email: string
    verified: boolean
}

export interface GitHubRepo {
    id: number
    full_name: string
    html_url: string
    default_branch?: string | null
    private?: boolean
    pushed_at?: string | null
}

export interface GitHubBranch {
    name: string
}

interface GitHubCommitActor {
    name?: string | null
    email?: string | null
    date: string
}

export interface GitHubCommit {
    sha: string
    html_url?: string | null
    commit: {
        message: string
        author: GitHubCommitActor
        committer?: GitHubCommitActor | null
    }
}
