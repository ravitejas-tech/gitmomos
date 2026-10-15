import type { MouseEventHandler, ReactNode } from 'react'
import { NavLink } from 'react-router'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text, type TextVariant } from '~/components/ui/text'
import { isExternalUrl } from '~/lib/url'
import { cn } from '~/lib/utils'

const textLinkVariants = cva('inline-flex items-center gap-1.5 transition-colors', {
    variants: {
        hover: {
            primary: 'hover:text-text-primary',
            accent: 'hover:text-accent-text',
        },
        active: {
            true: 'text-text-primary',
            false: 'text-text-secondary',
        },
    },
    defaultVariants: { hover: 'primary', active: false },
})

export interface TextLinkProps extends VariantProps<typeof textLinkVariants> {
    href: string
    children: ReactNode
    variant?: TextVariant
    className?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function TextLink({ href, children, hover, active, variant = 'body', className, onClick }: TextLinkProps) {
    const classes = cn(textLinkVariants({ hover, active }), className)
    const label = (
        <Text
            as='span'
            variant={variant}
            tone='inherit'>
            {children}
        </Text>
    )

    if (href.startsWith('/')) {
        return (
            <NavLink
                to={href}
                className={classes}
                onClick={onClick}>
                {label}
            </NavLink>
        )
    }

    const external = isExternalUrl(href)
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className={classes}
            onClick={onClick}>
            {label}
        </a>
    )
}
