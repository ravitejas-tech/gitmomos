import { Moon, Sun } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useTheme } from '~/hooks/use-theme'

export function ThemeToggle() {
    const { resolved, setPreference } = useTheme()
    const next = resolved === 'dark' ? 'light' : 'dark'

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => setPreference(next)}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}>
            {resolved === 'dark' ? <Sun /> : <Moon />}
        </Button>
    )
}
