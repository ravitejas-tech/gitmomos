import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const containerVariants = cva('mx-auto w-full px-4 md:px-6 lg:px-8', {
    variants: {
        size: {
            sm: 'max-w-2xl',
            document: 'max-w-4xl',
            md: 'max-w-7xl 2xl:max-w-[88rem]',
            lg: 'max-w-[96rem]',
        },
    },
    defaultVariants: { size: 'md' },
})

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
    return (
        <div
            className={cn(containerVariants({ size }), className)}
            {...props}
        />
    )
}
