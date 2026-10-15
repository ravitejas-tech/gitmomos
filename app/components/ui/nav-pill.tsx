import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const navPillVariants = cva('flex h-8 items-center rounded-lg px-2.5 text-sm transition-colors duration-100', {
    variants: {
        active: {
            true: 'bg-surface-muted font-semibold text-text-primary',
            false: 'text-text-secondary hover:bg-surface-muted/60 hover:text-text-primary',
        },
    },
})

export interface NavPillProps {
    to: string
    children: ReactNode
    active?: boolean
    end?: boolean
    className?: string
    onClick?: () => void
}

export function NavPill({ to, children, active, end = true, className, onClick }: NavPillProps) {
    return (
        <NavLink
            to={to}
            end={end}
            onClick={onClick}
            className={({ isActive }) => cn(navPillVariants({ active: active ?? isActive }), className)}>
            {children}
        </NavLink>
    )
}
