import { Github } from 'lucide-react'
import { HOME_PATH, RELEASES_PATH, REPO_URL, ROADMAP_PATH } from '~/data/navigation'
import { HOW_IT_WORKS_ID } from '~/data/landing/how-it-works'
import { FEATURES_ID } from '~/data/landing/sections'

export const NAVBAR_LINKS = [
    { label: 'Features', href: `${HOME_PATH}#${FEATURES_ID}` },
    { label: 'How it works', href: `${HOME_PATH}#${HOW_IT_WORKS_ID}` },
    { label: 'Roadmap', href: ROADMAP_PATH },
    { label: 'Releases', href: RELEASES_PATH },
] as const

export const NAVBAR_REPO_LINK = { label: 'GitHub', href: REPO_URL, icon: Github } as const
