import { Monitor, Moon, Sun } from 'lucide-react'

export const THEME_STORAGE_KEY = 'gitmomos-theme'

export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

export const THEME_OPTIONS = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
] as const

export type ThemePreference = (typeof THEME_OPTIONS)[number]['value']

export type ResolvedTheme = Exclude<ThemePreference, 'system'>

export const THEME_INIT_SCRIPT = `(function(){try{var p=localStorage.getItem('${THEME_STORAGE_KEY}');var d=p==='dark'||(p!=='light'&&matchMedia('${DARK_SCHEME_QUERY}').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()`
