import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Text } from '~/components/ui/text'
import { EASE_OUT } from '~/data/ui/motion'

export interface HeroIntroProps {
    badge: ReactNode
    title: readonly string[]
    lead: string
    actions: ReactNode
    footer: ReactNode
}

export function HeroIntro({ badge, title, lead, actions, footer }: HeroIntroProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className='mx-auto flex max-w-3xl flex-col items-center text-center'>
            {badge}
            <Text
                as='h1'
                variant='hero'
                tone='gradient'
                className='mt-8 pb-2'>
                {title.map((line) => (
                    <Text
                        key={line}
                        as='span'
                        variant='inherit'
                        tone='inherit'
                        className='block'>
                        {line}
                    </Text>
                ))}
            </Text>
            <Text
                variant='lead'
                tone='secondary'
                className='mt-6 max-w-xl'>
                {lead}
            </Text>
            <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>{actions}</div>
            {footer}
        </motion.div>
    )
}
