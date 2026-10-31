import { NavLink } from 'react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { IconLink } from '~/components/ui/icon-link'
import { Logo } from '~/components/ui/logo'
import { TextLink } from '~/components/ui/text-link'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { NAVBAR_LINKS, NAVBAR_REPO_LINK } from '~/data/layout/navbar'
import { DASHBOARD_PATH, HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from '~/data/navigation'
import { useSession } from '~/hooks/auth/use-session'

export function Navbar() {
    const { session } = useSession()

    return (
        <header className='sticky top-0 z-40 border-b border-border bg-bg/75 backdrop-blur-md print:hidden'>
            <Container className='flex h-14 items-center justify-between gap-4'>
                <div className='flex items-center gap-10'>
                    <NavLink
                        to={HOME_PATH}
                        aria-label='gitmomos home'>
                        <Logo />
                    </NavLink>
                    <nav className='hidden items-center gap-7 md:flex'>
                        {NAVBAR_LINKS.map(({ label, href }) => (
                            <TextLink
                                key={href}
                                href={href}>
                                {label}
                            </TextLink>
                        ))}
                    </nav>
                </div>

                <div className='flex items-center gap-1.5'>
                    <IconLink
                        {...NAVBAR_REPO_LINK}
                        className='hidden sm:inline-flex'
                    />
                    <ThemeToggle />
                    {!session && (
                        <Button
                            asChild
                            variant='ghost'
                            size='sm'>
                            <NavLink to={LOGIN_PATH}>Log in</NavLink>
                        </Button>
                    )}
                    <Button
                        asChild
                        variant='contrast'
                        size='pill-sm'>
                        <NavLink to={session ? DASHBOARD_PATH : SIGNUP_PATH}>
                            {session ? 'Open app' : 'Sign up'}
                        </NavLink>
                    </Button>
                </div>
            </Container>
        </header>
    )
}
