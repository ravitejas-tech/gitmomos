import { Github, Server } from 'lucide-react'

export const REPOSITORY_URL_PLACEHOLDER = 'https://github.com/owner/repository'

export const PROVIDER_ICONS = {
    github: Github,
    gitea: Server,
} as const
