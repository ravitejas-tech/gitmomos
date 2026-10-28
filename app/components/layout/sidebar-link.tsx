import type { LucideIcon } from 'lucide-react'
import { NavPill } from '~/components/ui/nav-pill'
import { cn } from '~/lib/utils'

export interface SidebarLinkProps {
    label: string
    to: string
    icon: LucideIcon
    end: boolean
    className?: string
    onClick?: () => void
}

export function SidebarLink({ label, to, icon: Icon, end, className, onClick }: SidebarLinkProps) {
    return (
        <NavPill
            to={to}
            end={end}
            onClick={onClick}
            className={cn('h-9 shrink-0 gap-2.5 whitespace-nowrap', className)}>
            <Icon className='size-4.5 opacity-80' />
            {label}
        </NavPill>
    )
}
