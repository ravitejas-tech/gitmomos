import type { UseScrollOptions } from 'framer-motion'

export const REVEAL_ENTER: UseScrollOptions['offset'] = ['start 0.95', 'start 0.55']
export const REVEAL_LEAVE: UseScrollOptions['offset'] = ['end 0.3', 'end 0']

export const REVEAL_MOTION = {
    rise: 64,
    lift: 40,
    shrink: 0.06,
    stagger: 0.15,
    maxStagger: 0.45,
} as const
