import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { REVEAL_ENTER, REVEAL_LEAVE } from '~/data/landing/reveal'
import { revealOffset, revealOpacity, revealProgress, revealScale } from '~/lib/landing/reveal'
import { cn } from '~/lib/utils'

export interface RevealProps {
    order?: number
    id?: string
    className?: string
    children: ReactNode
}

export function Reveal({ order = 0, id, className, children }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress: enter } = useScroll({ target: ref, offset: REVEAL_ENTER })
    const { scrollYProgress: leave } = useScroll({ target: ref, offset: REVEAL_LEAVE })
    const shown = useTransform(enter, (progress) => revealProgress(progress, order))
    const opacity = useTransform([shown, leave], revealOpacity)
    const y = useTransform([shown, leave], revealOffset)
    const scale = useTransform([shown, leave], revealScale)

    return (
        <motion.div
            ref={ref}
            id={id}
            style={{ opacity, y, scale }}
            className={cn('motion-reduce:transform-none! motion-reduce:opacity-100!', className)}>
            {children}
        </motion.div>
    )
}
