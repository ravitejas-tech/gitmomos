import { FileText, FolderGit2, LayoutDashboard, Settings } from 'lucide-react'
import { CONNECTIONS_PATH, DASHBOARD_PATH, REPORTS_PATH, SETTINGS_PATH } from '~/data/navigation'

export const PREVIEW_NAV = [
    { label: 'Overview', to: DASHBOARD_PATH, icon: LayoutDashboard },
    { label: 'Reports', to: REPORTS_PATH, icon: FileText },
    { label: 'Repositories', to: CONNECTIONS_PATH, icon: FolderGit2 },
    { label: 'Settings', to: SETTINGS_PATH, icon: Settings },
] as const

export const PREVIEW_ACTIVE_NAV = 'Reports'

export const PREVIEW_ACCOUNT = { name: 'Ada Park', detail: 'ada@northwind.dev' }

export const PREVIEW_TOOLBAR = { title: 'Reports', period: 'October 2026', synced: 'Synced 00:05' }
