import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/button'

export interface AuthLinkProps {
    to: string
    children: ReactNode
    newTab?: boolean
}

export function AuthLink({ to, children, newTab }: AuthLinkProps) {
    return (
        <Button
            asChild
            variant='link'
            size='inline'
            className='text-sm'>
            <NavLink
                to={to}
                target={newTab ? '_blank' : undefined}>
                {children}
            </NavLink>
        </Button>
    )
}
