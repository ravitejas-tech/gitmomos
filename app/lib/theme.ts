import { DARK_SCHEME_QUERY, THEME_STORAGE_KEY, type ResolvedTheme, type ThemePreference } from '~/data/ui/theme'

const listeners = new Set<() => void>()

export function getThemePreference(): ThemePreference {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY)
        return stored === 'light' || stored === 'dark' ? stored : 'system'
    } catch {
        return 'system'
    }
}

export function getResolvedTheme(): ResolvedTheme {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(preference: ThemePreference) {
    const dark = preference === 'dark' || (preference === 'system' && matchMedia(DARK_SCHEME_QUERY).matches)
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
}

export function setThemePreference(preference: ThemePreference) {
    try {
        if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
        else localStorage.setItem(THEME_STORAGE_KEY, preference)
    } catch {
        return
    } finally {
        applyTheme(preference)
        listeners.forEach((listener) => listener())
    }
}

export function subscribeTheme(listener: () => void) {
    const media = matchMedia(DARK_SCHEME_QUERY)
    const onSchemeChange = () => {
        applyTheme(getThemePreference())
        listener()
    }
    listeners.add(listener)
    media.addEventListener('change', onSchemeChange)
    return () => {
        listeners.delete(listener)
        media.removeEventListener('change', onSchemeChange)
    }
}

export function printInLightTheme() {
    const root = document.documentElement
    const theme = root.dataset.theme
    root.dataset.theme = 'light'
    window.print()
    if (theme) root.dataset.theme = theme
}
