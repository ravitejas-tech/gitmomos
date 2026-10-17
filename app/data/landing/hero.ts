import { version } from '~/../package.json'
import { RELEASES_PATH } from '~/data/navigation'

const [major, minor] = version.split('.')

export const HERO_ANNOUNCEMENT = {
    badge: 'New',
    label: `gitmomos ${major}.${minor} is web-only`,
    href: RELEASES_PATH,
}

export const HERO_TITLE = ['Work report automation', 'from your git commits'] as const

export const HERO_LEAD =
    'Built for developers. Connect GitHub or Gitea once, and every night your commits become a plain-language report your manager or client can follow, with charts of where your time went.'

export const HERO_FOOTNOTE = 'Free and open source · Fully automated · GitHub & Gitea'
