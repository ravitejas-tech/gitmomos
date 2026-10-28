import { NavLink } from 'react-router'
import { PeopleSearch } from '~/components/community/search/people-search'
import { MobileNav } from '~/components/layout/mobile-nav'
import { LogoMark } from '~/components/ui/logo-mark'
import { DASHBOARD_PATH } from '~/data/navigation'

export function DashboardTopbar() {
    return (
        <header className='sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-bg/75 px-4 backdrop-blur-md sm:px-6 md:h-16 md:justify-end lg:px-10 print:hidden'>
            <MobileNav />
            <NavLink
                to={DASHBOARD_PATH}
                aria-label='gitmomos overview'
                className='mr-1 md:hidden'>
                <LogoMark className='size-5' />
            </NavLink>
            <PeopleSearch />
        </header>
    )
}
