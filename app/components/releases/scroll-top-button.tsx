import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { SCROLL_TOP_OFFSET } from '~/data/releases/constants'
import { useScrolledPast } from '~/hooks/use-scrolled-past'
import { scrollToTop } from '~/lib/scroll'

export function ScrollTopButton() {
    const isVisible = useScrolledPast(SCROLL_TOP_OFFSET)

    return (
        <AnimatePresence>
            {isVisible && (
                <Button
                    key='scroll-top'
                    asChild
                    variant='secondary'
                    size='icon'
                    className='fixed right-6 bottom-6 z-40'>
                    <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        onClick={scrollToTop}
                        aria-label='Scroll to top'>
                        <ArrowUp />
                    </motion.button>
                </Button>
            )}
        </AnimatePresence>
    )
}
