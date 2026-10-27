import { version } from '~/../package.json'
import { TIMESHEET_SHOWCASE_ID } from '~/data/landing/showcase'
import { HOME_PATH } from '~/data/navigation'

const [major, minor] = version.split('.')

export const HERO_ANNOUNCEMENT = {
    badge: 'New',
    label: 'Timesheets, worked out from your commits',
    href: `${HOME_PATH}#${TIMESHEET_SHOWCASE_ID}`,
}

export const HERO_TITLE = ['Work report automation', 'from your git commits'] as const

export const HERO_LEAD =
    'Built for developers. Connect GitHub or Gitea once, and every night your commits become a plain-language daily report, a timesheet of your hours and a public profile your manager or clients can follow.'

export const HERO_FOOTNOTE = `v${major}.${minor} · Free and open source · Fully automated · GitHub & Gitea`
