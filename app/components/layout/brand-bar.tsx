import { NavLink } from 'react-router'
import { Container, type ContainerProps } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { HOME_PATH } from '~/data/navigation'

export function BrandBar({ size = 'document' }: Pick<ContainerProps, 'size'>) {
    return (
        <Container
            size={size}
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
