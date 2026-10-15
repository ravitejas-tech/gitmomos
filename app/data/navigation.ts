import { FileText, FolderGit2, LayoutDashboard, Settings } from 'lucide-react'

export const HOME_PATH = '/'
export const RELEASES_PATH = '/releases'
export const LICENSE_PATH = '/legal/license'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const DASHBOARD_PATH = '/dashboard'
export const REPORTS_PATH = '/dashboard/reports'
export const CONNECTIONS_PATH = '/dashboard/connections'
export const SETTINGS_PATH = '/dashboard/settings'
export const PRIVACY_PATH = '/legal/privacy'

export const REPO_SLUG = 'ravitejas-tech/gitmomos'
export const REPO_URL = `https://github.com/${REPO_SLUG}`

export const DASHBOARD_NAV = [
    { label: 'Overview', to: DASHBOARD_PATH, icon: LayoutDashboard, end: true },
    { label: 'Reports', to: REPORTS_PATH, icon: FileText, end: false },
    { label: 'Repositories', to: CONNECTIONS_PATH, icon: FolderGit2, end: false },
    { label: 'Settings', to: SETTINGS_PATH, icon: Settings, end: false },
] as const

export const FOOTER_LINKS = {
    Product: [
        { name: 'How it works', href: '/#how-it-works' },
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
