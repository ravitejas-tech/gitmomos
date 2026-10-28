import { cva, type VariantProps } from 'class-variance-authority'

const bannerVariants = cva('relative overflow-hidden bg-accent-subtle', {
    variants: {
        size: {
            page: 'h-32 rounded-2xl border border-border sm:h-44 lg:h-56',
            preview: 'aspect-3/1 w-full rounded-2xl border border-border',
            strip: 'h-20 border-b border-border',
        },
    },
    defaultVariants: { size: 'page' },
})

export interface ProfileBannerProps extends VariantProps<typeof bannerVariants> {
    src: string | null
}

export function ProfileBanner({ src, size }: ProfileBannerProps) {
    return (
        <div
            aria-hidden
            className={bannerVariants({ size })}>
            {src ? (
                <img
                    src={src}
                    alt=''
                    className='size-full object-cover'
                />
            ) : (
                <>
                    <div className='absolute inset-0 bg-grid-lines' />
                    <div className='absolute inset-0 bg-hero-glow' />
                </>
            )}
        </div>
    )
}
