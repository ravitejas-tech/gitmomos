import { NavLink } from 'react-router'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { HOME_PATH } from '~/data/navigation'

export function BrandBar() {
    return (
        <Container
            size='document'
            className='pt-6 print:hidden'>
            <NavLink
                to={HOME_PATH}
                aria-label='gitmomos home'
                className='inline-flex'>
                <Logo />
            </NavLink>
        </Container>
    )
}
