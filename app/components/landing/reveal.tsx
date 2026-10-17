import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '~/data/ui/motion'

export interface RevealProps {
    className?: string
    children: ReactNode
}

export function Reveal({ className, children }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className={className}>
            {children}
        </motion.div>
    )
}
