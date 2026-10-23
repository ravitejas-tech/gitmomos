import { MomiFace } from '~/components/ui/momi-face'
import { cn } from '~/lib/utils'
import type { MomiMood } from '~/types/momi'

export interface MomiProps {
    mood?: MomiMood
    steam?: boolean
    animated?: boolean
    shadow?: boolean
    className?: string
}

export function Momi({ mood = 'idle', steam = true, animated = false, shadow = true, className }: MomiProps) {
    return (
        <svg
            viewBox='0 0 64 64'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden
            className={cn('size-16 shrink-0', className)}>
            {shadow && (
                <ellipse
                    cx='32'
                    cy='58'
                    rx='16'
                    ry='2.4'
                    className='fill-momi-shadow'
                />
            )}
            <g className={cn(animated && 'motion-safe:animate-momi-bob')}>
                {steam && (
                    <path
                        className={cn(
                            'stroke-accent',
                            (animated || mood === 'thinking') && 'motion-safe:animate-momi-steam',
                        )}
                        strokeWidth={1.8}
                        d='M24.5 10.5c-1.3-1.2-1.3-2.5 0-3.7s1.3-2.5 0-3.7M39.5 10.5c-1.3-1.2-1.3-2.5 0-3.7s1.3-2.5 0-3.7'
                    />
                )}
                <path
                    className='fill-momi-body stroke-momi-line'
                    strokeWidth={1.9}
                    d='M32 15c8.6 1.6 21.4 9 21.4 23.4 0 10.4-9.4 16.6-21.4 16.6s-21.4-6.2-21.4-16.6C10.6 24 23.4 16.6 32 15Z'
                />
                <path
                    className='fill-momi-shade'
                    d='M13.2 45.2c3.2 5.8 10.2 8.5 18.8 8.5s15.6-2.7 18.8-8.5c-4.4 3.1-11 4.6-18.8 4.6s-14.4-1.5-18.8-4.6Z'
                />
                <path
                    className='stroke-momi-line/40'
                    strokeWidth={1.5}
                    d='M32 16c-5.6 2.4-10.4 6.6-12.6 12.2M32 16c-2.6 2.8-4 6.2-4.4 9.8M32 16c2.6 2.8 4 6.2 4.4 9.8M32 16c5.6 2.4 10.4 6.6 12.6 12.2'
                />
                <path
                    className='fill-momi-body stroke-momi-line'
                    strokeWidth={1.9}
                    d='M28.6 16.4c.3-2.6 1.6-4.6 3.4-5.6 1.8 1 3.1 3 3.4 5.6-1.1.7-2.2 1-3.4 1s-2.3-.3-3.4-1Z'
                />
                <ellipse
                    cx='18.6'
                    cy='31.5'
                    rx='1.6'
                    ry='3.1'
                    transform='rotate(32 18.6 31.5)'
                    className='fill-momi-shine/90'
                />
                <MomiFace
                    mood={mood}
                    animated={animated}
                />
            </g>
        </svg>
    )
}
