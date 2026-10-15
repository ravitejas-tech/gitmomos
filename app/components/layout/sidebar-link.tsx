import type { LucideIcon } from 'lucide-react'
import { NavPill } from '~/components/ui/nav-pill'

export interface SidebarLinkProps {
    label: string
    to: string
    icon: LucideIcon
    end: boolean
}

export function SidebarLink({ label, to, icon: Icon, end }: SidebarLinkProps) {
    return (
        <NavPill
            to={to}
            end={end}
            className='h-9 shrink-0 gap-2.5 whitespace-nowrap'>
            <Icon className='size-4.5 opacity-80' />
            {label}
        </NavPill>
    )
}
