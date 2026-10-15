import type { HTMLAttributes, LabelHTMLAttributes, TimeHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const textVariants = cva('', {
    variants: {
        variant: {
            inherit: '',
            body: 'text-sm',
            strong: 'text-sm font-semibold',
            prose: 'text-base/7',
            article: 'text-md',
            lead: 'text-base sm:text-lg/8',
            caption: 'text-caption',
            'caption-strong': 'text-caption font-medium',
            micro: 'text-xs',
            eyebrow: 'text-xs font-medium',
            label: 'text-xs font-semibold tracking-wider uppercase',
            title: 'text-sm font-semibold',
            subheading: 'text-base font-semibold',
            heading: 'text-lg font-semibold',
            'page-title': 'text-2xl font-bold',
            'document-title': 'text-3xl/tight font-bold text-balance sm:text-4xl/tight',
            stat: 'text-3xl font-bold tabular-nums',
            display: 'text-3xl font-bold tracking-tight text-balance sm:text-5xl',
            hero: 'text-5xl leading-none font-bold tracking-tighter text-balance sm:text-6xl md:text-7xl',
            code: 'font-mono text-code',
            meta: 'font-mono text-xs',
        },
        tone: {
            inherit: '',
            primary: 'text-text-primary',
            secondary: 'text-text-secondary',
            muted: 'text-text-muted',
            accent: 'text-accent-text',
            gradient: 'text-heading-gradient',
            success: 'text-success',
            danger: 'text-danger',
            warning: 'text-warning',
        },
        numeric: { true: 'tabular-nums' },
        truncate: { true: 'truncate' },
    },
})

export type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>
export type TextTone = NonNullable<VariantProps<typeof textVariants>['tone']>

const DEFAULT_TONES: Partial<Record<TextVariant, TextTone>> = {
    inherit: 'inherit',
    caption: 'muted',
    'caption-strong': 'muted',
    micro: 'muted',
    eyebrow: 'muted',
    label: 'muted',
    meta: 'muted',
}

type TextTag = 'p' | 'span' | 'div' | 'li' | 'h1' | 'h2' | 'h3' | 'h4' | 'label' | 'strong' | 'small' | 'code' | 'time'

export interface TextProps
    extends
        HTMLAttributes<HTMLElement>,
        Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>,
        Pick<TimeHTMLAttributes<HTMLTimeElement>, 'dateTime'> {
    as?: TextTag
    variant?: TextVariant
    tone?: TextTone
    numeric?: boolean
    truncate?: boolean
}

export function Text({ as: Tag = 'p', variant = 'body', tone, numeric, truncate, className, ...props }: TextProps) {
    return (
        <Tag
            className={cn(
                textVariants({ variant, tone: tone ?? DEFAULT_TONES[variant] ?? 'primary', numeric, truncate }),
                className,
            )}
            {...props}
        />
    )
}
