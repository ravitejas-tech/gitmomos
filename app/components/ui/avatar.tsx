import { AVATAR_SIZES, AVATAR_TONES } from '~/data/ui/avatar'
import { cn } from '~/lib/utils'

export interface AvatarProps {
    name: string
    src?: string | null
    size?: keyof typeof AVATAR_SIZES
    tone?: keyof typeof AVATAR_TONES
    className?: string
}

export function Avatar({ name, src, size = 'sm', tone = 'subtle', className }: AvatarProps) {
    const classes = cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium',
        AVATAR_SIZES[size],
        AVATAR_TONES[tone],
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
