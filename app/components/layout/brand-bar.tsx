import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { Container, type ContainerProps } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { HOME_PATH } from '~/data/navigation'

export interface BrandBarProps extends Pick<ContainerProps, 'size'> {
    actions?: ReactNode
}

export function BrandBar({ size = 'document', actions }: BrandBarProps) {
    return (
        <Container
            size={size}
            className='flex items-center justify-between gap-4 pt-6 print:hidden'>
            <NavLink
                to={HOME_PATH}
                aria-label='gitmomos home'
                className='inline-flex'>
                <Logo />
            </NavLink>
            {actions && <div className='flex items-center gap-1'>{actions}</div>}
        </Container>
    )
}
