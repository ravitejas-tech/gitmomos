import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Alert } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { PUBLIC_PROFILE_SETTINGS_PATH } from '~/data/navigation'
import { useProfile } from '~/hooks/profile/queries'

export function PrivateProfileAlert({ children }: { children: ReactNode }) {
    const { data: profile } = useProfile()
    if (!profile || profile.is_public) return null

    return (
        <Alert
            tone='warning'
            action={
                <Button
                    asChild
                    variant='secondary'
                    size='sm'>
                    <Link to={PUBLIC_PROFILE_SETTINGS_PATH}>Make it public</Link>
                </Button>
            }>
            {children}
        </Alert>
    )
}
