import { Link } from 'react-router'
import { KeyRound } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { AI_KEY_SETTINGS_PATH } from '~/data/ai-key/constants'

export function AddAiKeyButton({ variant = 'secondary' }: Pick<ButtonProps, 'variant'>) {
    return (
        <Button
            asChild
            variant={variant}
            size='sm'>
            <Link to={AI_KEY_SETTINGS_PATH}>
                <KeyRound />
                Add API key
            </Link>
        </Button>
    )
}
