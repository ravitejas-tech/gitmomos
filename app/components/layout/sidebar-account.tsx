import { LogoutButton } from '~/components/layout/logout-button'
import { Avatar } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { useProfile } from '~/hooks/profile/queries'

export function SidebarAccount() {
    const { data: profile } = useProfile()
    const name = profile?.full_name || profile?.email || ''

    return (
        <div className='flex items-center gap-2 rounded-md px-1 py-1'>
            <Avatar
                name={name}
                size='md'
            />
            <div className='min-w-0 flex-1'>
                <Text
                    variant='strong'
                    truncate>
                    {profile?.full_name || 'Account'}
                </Text>
                <Text
                    variant='micro'
                    truncate>
                    {profile?.email}
                </Text>
            </div>
            <ThemeToggle />
            <LogoutButton />
        </div>
    )
}
