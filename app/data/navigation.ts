import {
    CalendarClock,
    FileText,
    FolderGit2,
    FolderKanban,
    Globe,
    LayoutDashboard,
    Medal,
    Settings,
    UsersRound,
} from 'lucide-react'
import { COMING_SOON } from '~/data/coming-soon/features'
import { FAQ_ID } from '~/data/landing/faq'
import { HOW_IT_WORKS_ID } from '~/data/landing/how-it-works'
import { FEATURES_ID } from '~/data/landing/sections'

export const HOME_PATH = '/'
export const RELEASES_PATH = '/releases'
export const LICENSE_PATH = '/legal/license'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const DASHBOARD_PATH = '/dashboard'
export const REPORTS_PATH = '/dashboard/reports'
export const TIMESHEET_PATH = '/dashboard/timesheet'
export const PROJECTS_PATH = '/dashboard/projects'
export const CONNECTIONS_PATH = '/dashboard/connections'
export const SETTINGS_PATH = '/dashboard/settings'
export const PUBLIC_PROFILE_SETTINGS_PATH = '/dashboard/profile'
export const COMMUNITY_PATH = '/dashboard/community'
export const LEADERBOARD_PATH = '/dashboard/leaderboard'
export const ROADMAP_PATH = '/roadmap'
export const PRIVACY_PATH = '/legal/privacy'

export const REPO_SLUG = 'ravitejas-tech/gitmomos'
export const REPO_URL = `https://github.com/${REPO_SLUG}`
export const NEW_ISSUE_URL = `${REPO_URL}/issues/new`

export const DASHBOARD_NAV = [
    { label: 'Overview', to: DASHBOARD_PATH, icon: LayoutDashboard, end: true },
    { label: 'Reports', to: REPORTS_PATH, icon: FileText, end: false },
    { label: 'Timesheet', to: TIMESHEET_PATH, icon: CalendarClock, end: false },
    { label: 'Projects', to: PROJECTS_PATH, icon: FolderKanban, end: false },
    { label: 'Repositories', to: CONNECTIONS_PATH, icon: FolderGit2, end: false },
    { label: 'Public profile', to: PUBLIC_PROFILE_SETTINGS_PATH, icon: Globe, end: false },
    { label: 'Community', to: COMMUNITY_PATH, icon: UsersRound, end: false },
    { label: 'Leaderboard', to: LEADERBOARD_PATH, icon: Medal, end: false },
] as const

export const COMING_SOON_NAV = COMING_SOON.map(({ slug, label, icon }) => ({
    label,
    icon,
    to: `${DASHBOARD_PATH}/${slug}`,
    end: true,
}))

export const SETTINGS_NAV = { label: 'Settings', to: SETTINGS_PATH, icon: Settings, end: false } as const

export const FOOTER_LINKS = {
    Product: [
        { name: 'Features', href: `${HOME_PATH}#${FEATURES_ID}` },
        { name: 'How it works', href: `${HOME_PATH}#${HOW_IT_WORKS_ID}` },
        { name: 'FAQ', href: `${HOME_PATH}#${FAQ_ID}` },
        { name: 'Roadmap', href: ROADMAP_PATH },
        { name: 'Dashboard', href: DASHBOARD_PATH },
        { name: 'Releases', href: RELEASES_PATH },
    ],
    Community: [
        { name: 'GitHub', href: REPO_URL },
        { name: 'Issues', href: `${REPO_URL}/issues` },
    ],
    Legal: [
        { name: 'Privacy Policy', href: PRIVACY_PATH },
        { name: 'License', href: LICENSE_PATH },
    ],
} as const
