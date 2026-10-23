import type { ReactNode } from 'react'
import { Backdrop } from '~/components/ui/backdrop'
import { Container } from '~/components/ui/container'
import { cn } from '~/lib/utils'

export interface HeroShellProps {
    className?: string
    children: ReactNode
}

export function HeroShell({ className, children }: HeroShellProps) {
    return (
        <section className={cn('relative isolate overflow-hidden pt-20 md:pt-28', className)}>
            <Backdrop grid />
            <Container>{children}</Container>
        </section>
    )
}
