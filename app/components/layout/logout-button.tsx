import { LogOut } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useLogout } from '~/hooks/auth/mutations'

export function LogoutButton() {
    const { mutate: logout, isPending } = useLogout()

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => logout()}
            disabled={isPending}
            aria-label='Log out'
            title='Log out'>
            <LogOut />
        </Button>
    )
}
