import { cn } from '~/lib/utils'

export interface AvatarProps {
    name: string
    src?: string | null
    size?: 'sm' | 'md'
    className?: string
}

export function Avatar({ name, src, size = 'sm', className }: AvatarProps) {
    const classes = cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-subtle font-medium text-accent-text',
        size === 'sm' ? 'size-5 text-2xs' : 'size-7 text-xs',
        className,
    )

    if (src) {
        return (
            <img
                src={src}
                alt=''
                className={classes}
            />
        )
    }

    return <span className={classes}>{name.trim().charAt(0).toUpperCase() || '?'}</span>
}
