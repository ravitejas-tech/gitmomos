import { motion } from 'framer-motion'
import { PreviewAppWindow } from '~/components/landing/preview/app-window'
import { PreviewReport } from '~/components/landing/preview/report'
import { EASE_OUT } from '~/data/ui/motion'

export function ProductShot() {
    return (
        <motion.div
            aria-hidden
            inert
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
            className='relative mt-16 select-none md:mt-20'>
            <div className='hidden [perspective:2400px] md:block'>
                <div className='origin-top [transform:rotateX(14deg)] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]'>
                    <PreviewAppWindow />
                </div>
            </div>
            <div className='overflow-hidden rounded-xl border border-border bg-panel shadow-overlay [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:hidden'>
                <div className='h-[34rem] overflow-hidden'>
                    <PreviewReport />
                </div>
            </div>
        </motion.div>
    )
}
