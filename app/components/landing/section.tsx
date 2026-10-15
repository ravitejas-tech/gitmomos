import type { ReactNode } from 'react'
import { Container } from '~/components/ui/container'
import { cn } from '~/lib/utils'

export interface LandingSectionProps {
    id?: string
    className?: string
    children: ReactNode
}

export function LandingSection({ id, className, children }: LandingSectionProps) {
    return (
        <section
            id={id}
            className={cn('relative isolate scroll-mt-14 py-24 md:py-32', className)}>
            <Container>{children}</Container>
        </section>
    )
}
