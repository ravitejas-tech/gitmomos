import { Coffee, Github } from 'lucide-react'

export const STREAM_COMMITS = [
    { sha: 'a3f9c21', message: 'feat(checkout): save cards', repo: 'checkout', branch: 'main' },
    { sha: '41c7e8a', message: 'refactor: retry through queue', repo: 'api', branch: 'webhooks' },
    { sha: 'e2d5b90', message: 'test: await network idle', repo: 'checkout', branch: 'fix/flaky' },
    { sha: '7f18a3c', message: 'feat: worker backlog alert', repo: 'infra', branch: 'main' },
] as const

export const SCHEDULE = {
    time: '00:05',
    timezone: 'Asia/Kolkata',
    day: 'Thu, Oct 15',
    status: 'Report ready',
}

export const CONNECTIONS = [
    { name: 'GitHub', detail: '@adapark · 12 repositories', icon: Github },
    { name: 'Gitea', detail: 'git.northwind.dev · 3 repositories', icon: Coffee },
] as const

export const COPY_SNIPPET = {
    title: 'Wed, Oct 14',
    bullets: ['Shipped saved cards behind a flag', 'Moved webhook retries onto the queue'],
    action: 'Copy as Markdown',
    keys: ['⌘', 'C'],
}

export const METADATA_ROWS = [
    { label: 'Commit messages', allowed: true },
    { label: 'Timestamps', allowed: true },
    { label: 'Repository names', allowed: true },
    { label: 'Source code', allowed: false },
] as const
