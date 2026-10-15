import { useSyncExternalStore } from 'react'
import type { ResolvedTheme, ThemePreference } from '~/data/ui/theme'
import { getResolvedTheme, getThemePreference, setThemePreference, subscribeTheme } from '~/lib/theme'

const serverPreference = (): ThemePreference => 'system'
const serverResolved = (): ResolvedTheme => 'light'

export function useTheme() {
    const preference = useSyncExternalStore(subscribeTheme, getThemePreference, serverPreference)
    const resolved = useSyncExternalStore(subscribeTheme, getResolvedTheme, serverResolved)
    return { preference, resolved, setPreference: setThemePreference }
}
