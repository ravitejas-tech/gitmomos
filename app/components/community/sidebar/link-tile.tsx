import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cva, type VariantProps } from 'class-variance-authority'

const linkTileVariants = cva(
    'rounded-lg transition-colors hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none',
    {
        variants: {
            tone: {
                stat: 'block px-1 py-2 text-center',
                outline: 'flex items-center gap-3 border border-border px-3 py-2.5',
            },
        },
        defaultVariants: { tone: 'stat' },
    },
)

export interface LinkTileProps extends VariantProps<typeof linkTileVariants> {
    to: string
    children: ReactNode
}

export function LinkTile({ to, tone, children }: LinkTileProps) {
    return (
        <Link
            to={to}
            className={linkTileVariants({ tone })}>
            {children}
        </Link>
    )
}
