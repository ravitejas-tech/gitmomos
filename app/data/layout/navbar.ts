import { HOME_PATH, RELEASES_PATH, REPO_URL } from '~/data/navigation'
import { HOW_IT_WORKS_ID } from '~/data/landing/how-it-works'

export const NAVBAR_LINKS = [
    { label: 'How it works', href: `${HOME_PATH}#${HOW_IT_WORKS_ID}` },
    { label: 'Releases', href: RELEASES_PATH },
    { label: 'GitHub', href: REPO_URL },
] as const
