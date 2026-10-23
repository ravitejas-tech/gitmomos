import { Link } from 'react-router'
import { KeyRound } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { GEMINI_KEY_SETTINGS_PATH } from '~/data/gemini-key/constants'

export function AddGeminiKeyButton({ variant = 'secondary' }: Pick<ButtonProps, 'variant'>) {
    return (
        <Button
            asChild
            variant={variant}
            size='sm'>
            <Link to={GEMINI_KEY_SETTINGS_PATH}>
                <KeyRound />
                Add API key
            </Link>
        </Button>
    )
}
