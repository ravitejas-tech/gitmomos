import { NavLink } from 'react-router'
import { LogoutButton } from '~/components/layout/logout-button'
import { SidebarAccount } from '~/components/layout/sidebar-account'
import { SidebarLink } from '~/components/layout/sidebar-link'
import { Logo } from '~/components/ui/logo'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { DASHBOARD_NAV, DASHBOARD_PATH } from '~/data/navigation'

export function Sidebar() {
    return (
        <aside className='flex flex-col border-b border-border bg-panel md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-r md:border-b-0 print:hidden'>
            <div className='flex h-14 items-center justify-between px-4 md:h-16 md:px-5'>
                <NavLink to={DASHBOARD_PATH}>
                    <Logo />
                </NavLink>
                <div className='flex items-center md:hidden'>
                    <ThemeToggle />
                    <LogoutButton />
                </div>
            </div>

            <nav className='flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:pt-2'>
                {DASHBOARD_NAV.map((item) => (
                    <SidebarLink
                        key={item.to}
                        {...item}
                    />
                ))}
            </nav>

            <div className='hidden border-t border-border p-3 md:block'>
                <SidebarAccount />
            </div>
        </aside>
    )
}
