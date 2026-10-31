import type { LucideIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'

export interface IconLinkProps {
    href: string
    label: string
    icon: LucideIcon
    className?: string
}

export function IconLink({ href, label, icon: Icon, className }: IconLinkProps) {
    return (
        <Button
            asChild
            variant='ghost'
            size='icon'
            className={className}>
            <a
                href={href}
                target='_blank'
                rel='noreferrer'
                aria-label={label}
                title={label}>
                <Icon />
            </a>
        </Button>
    )
}
