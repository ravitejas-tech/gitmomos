import { DASHBOARD_PATH, HOME_PATH, LICENSE_PATH, PRIVACY_PATH, RELEASES_PATH, ROADMAP_PATH } from '~/data/navigation'

export const SITE_URL = 'https://gitmomos.spheo.online'
export const SITE_NAME = 'gitmomos'
export const SITE_LOCALE = 'en_US'
export const SITE_DESCRIPTION =
    'Free, open-source work report automation for developers. Connect GitHub or Gitea and get a daily work report written from your git commits, automatically.'
export const SITEMAP_PATH = '/sitemap.xml'

export const SITE_IMAGE = {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'gitmomos: work report automation from your git commits',
} as const

export const SITE_KEYWORDS = [
    'work report automation',
    'automated work reports',
    'daily work report generator',
    'git commit report',
    'git commit summary',
    'standup report automation',
    'developer status report',
    'GitHub work report',
    'Gitea work report',
    'developer productivity',
] as const

export const SITEMAP_PATHS = [HOME_PATH, ROADMAP_PATH, RELEASES_PATH, PRIVACY_PATH, LICENSE_PATH] as const

export const CRAWL_DISALLOW = [DASHBOARD_PATH] as const
