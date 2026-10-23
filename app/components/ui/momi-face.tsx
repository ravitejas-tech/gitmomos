import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'
import type { MomiMood } from '~/types/momi'

function OpenEyes({ x, y, animated }: { x: number; y: number; animated: boolean }) {
    return (
        <g className={cn('origin-center transform-fill', animated && 'motion-safe:animate-momi-blink')}>
            <ellipse
                cx={x}
                cy={y}
                rx='2.5'
                ry='3.1'
                className='fill-momi-line'
            />
            <ellipse
                cx={x + 14.4}
                cy={y}
                rx='2.5'
                ry='3.1'
                className='fill-momi-line'
            />
            <circle
                cx={x + 0.9}
                cy={y - 1.2}
                r='0.95'
                className='fill-momi-shine'
            />
            <circle
                cx={x + 15.3}
                cy={y - 1.2}
                r='0.95'
                className='fill-momi-shine'
            />
        </g>
    )
}

function faces(animated: boolean): Record<MomiMood, ReactNode> {
    return {
        idle: (
            <>
                <OpenEyes
                    x={24.8}
                    y={38.8}
                    animated={animated}
                />
                <path
                    className='stroke-momi-line'
                    strokeWidth={1.6}
                    d='M29.4 43c1.5 1.9 3.7 1.9 5.2 0'
                />
            </>
        ),
        happy: (
            <>
                <path
                    className='stroke-momi-line'
                    strokeWidth={1.9}
                    d='M22.2 39.6c1.4-2.6 3.8-2.6 5.2 0M36.6 39.6c1.4-2.6 3.8-2.6 5.2 0'
                />
                <path
                    className='fill-momi-line'
                    d='M28.8 42.4h6.4c0 2.4-1.4 3.8-3.2 3.8s-3.2-1.4-3.2-3.8Z'
                />
                <path
                    className='fill-momi-blush'
                    d='M30.3 45.2c.5-.8 1.1-1.1 1.7-1.1s1.2.3 1.7 1.1c-.5.4-1.1.6-1.7.6s-1.2-.2-1.7-.6Z'
                />
            </>
        ),
        thinking: (
            <>
                <OpenEyes
                    x={25.6}
                    y={37.8}
                    animated={animated}
                />
                <ellipse
                    cx='33'
                    cy='44'
                    rx='1.5'
                    ry='1.7'
                    className='fill-momi-line'
                />
            </>
        ),
        sleepy: (
            <>
                <path
                    className='stroke-momi-line'
                    strokeWidth={1.9}
                    d='M22.2 38.6c1.4 1.8 3.8 1.8 5.2 0M36.6 38.6c1.4 1.8 3.8 1.8 5.2 0'
                />
                <path
                    className='stroke-momi-line'
                    strokeWidth={1.6}
                    d='M30.4 43.6h3.2'
                />
            </>
        ),
    }
}

export function MomiFace({ mood, animated }: { mood: MomiMood; animated: boolean }) {
    return (
        <g>
            <ellipse
                cx='19'
                cy='44'
                rx='3.3'
                ry='2'
                className='fill-momi-blush/75'
            />
            <ellipse
                cx='45'
                cy='44'
                rx='3.3'
                ry='2'
                className='fill-momi-blush/75'
            />
            {faces(animated)[mood]}
        </g>
    )
}
