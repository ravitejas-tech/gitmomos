import { NavLink } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { DASHBOARD_PATH, SIGNUP_PATH } from '~/data/navigation'
import { useSession } from '~/hooks/auth/use-session'

export function GetStartedButton() {
    const { session } = useSession()

    return (
        <Button
            asChild
            variant='contrast'
            size='pill'>
            <NavLink to={session ? DASHBOARD_PATH : SIGNUP_PATH}>
                {session ? 'Open app' : 'Get started'}
                <ArrowRight />
            </NavLink>
        </Button>
    )
}
