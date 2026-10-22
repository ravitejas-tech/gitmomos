import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
    'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary: 'bg-accent text-accent-foreground shadow-edge hover:bg-accent-hover',
                contrast: 'bg-text-primary text-bg hover:bg-text-primary/85',
                secondary:
                    'border border-border-strong bg-surface text-text-primary shadow-card hover:bg-surface-muted',
                ghost: 'text-text-secondary hover:bg-surface-muted hover:text-text-primary',
                danger: 'text-text-secondary hover:bg-danger-subtle hover:text-danger',
                link: 'text-accent-text underline-offset-4 hover:underline',
            },
            size: {
                sm: 'h-8 px-3 text-caption [&_svg]:size-3.5',
                md: 'h-9 px-3.5 text-sm',
                lg: 'h-10 px-4 text-sm',
                pill: 'h-10 rounded-full px-5 text-sm',
                'pill-sm': 'h-8 rounded-full px-3.5 text-caption',
                chip: 'min-h-8 rounded-2xl px-3.5 py-1.5 text-left text-caption whitespace-normal',
                icon: 'size-8',
                inline: 'h-auto p-0 text-caption',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Component = asChild ? Slot : 'button'
        return (
            <Component
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'
