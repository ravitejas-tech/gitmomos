import type { HTMLAttributes } from 'react'
import { Container } from '~/components/ui/container'
import { cn } from '~/lib/utils'

export function Section({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
    return (
        <section
            className={cn('py-16 md:py-24', className)}
            {...props}>
            <Container>{children}</Container>
        </section>
    )
}
