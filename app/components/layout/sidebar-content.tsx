import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { SidebarAccount } from '~/components/layout/sidebar-account'
import { SidebarLink } from '~/components/layout/sidebar-link'
import { Logo } from '~/components/ui/logo'
import { Text } from '~/components/ui/text'
import { COMING_SOON_NAV, DASHBOARD_NAV, DASHBOARD_PATH, SETTINGS_NAV } from '~/data/navigation'

export interface SidebarContentProps {
    action?: ReactNode
    onNavigate?: () => void
}

export function SidebarContent({ action, onNavigate }: SidebarContentProps) {
    return (
        <>
            <div className='flex h-14 shrink-0 items-center justify-between px-5 md:h-16'>
                <NavLink
                    to={DASHBOARD_PATH}
                    onClick={onNavigate}>
                    <Logo />
                </NavLink>
                {action}
            </div>

            <nav className='flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pt-2 pb-3'>
                {DASHBOARD_NAV.map((item) => (
                    <SidebarLink
                        key={item.to}
                        {...item}
                        onClick={onNavigate}
                    />
                ))}
                <Text
                    variant='label'
                    className='px-2.5 pt-5 pb-1'>
                    Coming soon
                </Text>
                {COMING_SOON_NAV.map((item) => (
                    <SidebarLink
                        key={item.to}
                        {...item}
                        onClick={onNavigate}
                    />
                ))}
                <SidebarLink
                    {...SETTINGS_NAV}
                    onClick={onNavigate}
                    className='mt-auto'
                />
            </nav>

            <div className='border-t border-border p-3'>
                <SidebarAccount />
            </div>
        </>
    )
}
