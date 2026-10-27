import { REVEAL_MOTION } from '~/data/landing/reveal'

const unit = (value: number) => Math.min(Math.max(value, 0), 1)

export function revealProgress(enter: number, order: number): number {
    const start = Math.min(order * REVEAL_MOTION.stagger, REVEAL_MOTION.maxStagger)
    return unit((enter - start) / (1 - start))
}

export function revealOpacity([shown = 0, gone = 0]: number[]): number {
    return Math.min(shown, 1 - gone)
}

export function revealOffset([shown = 0, gone = 0]: number[]): number {
    return (1 - shown) * REVEAL_MOTION.rise - gone * REVEAL_MOTION.lift
}

export function revealScale([shown = 0, gone = 0]: number[]): number {
    return 1 - (1 - shown + gone / 2) * REVEAL_MOTION.shrink
}
