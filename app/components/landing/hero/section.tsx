import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Backdrop } from '~/components/landing/backdrop'
import { GetStartedButton } from '~/components/landing/get-started-button'
import { HeroAnnouncement } from '~/components/landing/hero/announcement'
import { ProductShot } from '~/components/landing/preview/product-shot'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Text } from '~/components/ui/text'
import { HERO_FOOTNOTE, HERO_LEAD, HERO_TITLE } from '~/data/landing/hero'
import { HOW_IT_WORKS_ID } from '~/data/landing/how-it-works'
import { scrollToId } from '~/lib/scroll'

export function HeroSection() {
    return (
        <section className='relative isolate overflow-hidden pt-20 md:pt-28'>
            <Backdrop grid />
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className='mx-auto flex max-w-3xl flex-col items-center text-center'>
                    <HeroAnnouncement />
                    <Text
                        as='h1'
                        variant='hero'
                        tone='gradient'
                        className='mt-8 pb-2'>
                        {HERO_TITLE.map((line) => (
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
                        {HERO_LEAD}
                    </Text>
                    <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
                        <GetStartedButton />
                        <Button
                            variant='ghost'
                            size='pill'
                            onClick={() => scrollToId(HOW_IT_WORKS_ID)}>
                            How it works
                            <ArrowRight />
                        </Button>
                    </div>
                    <Text
                        variant='caption'
                        className='mt-5'>
                        {HERO_FOOTNOTE}
                    </Text>
                </motion.div>
                <ProductShot />
            </Container>
        </section>
    )
}
