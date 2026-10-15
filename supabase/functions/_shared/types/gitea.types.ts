export interface GiteaUser {
    login: string
    full_name?: string
    avatar_url?: string | null
    email?: string
}

export interface GiteaEmail {
    email: string
}

export interface GiteaRepo {
    id: number
    full_name: string
    html_url: string
    default_branch?: string | null
    private?: boolean
    updated_at?: string | null
}

export interface GiteaBranch {
    name: string
    commit?: { timestamp?: string }
}

interface GiteaCommitActor {
    name?: string | null
    email?: string | null
    date?: string
}

export interface GiteaCommit {
    sha: string
    html_url?: string | null
    created: string
    author?: { login?: string } | null
    commit: {
        message: string
        author?: GiteaCommitActor | null
        committer?: GiteaCommitActor | null
    }
}
