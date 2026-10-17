import { ArrowRight } from 'lucide-react'
import { GetStartedButton } from '~/components/landing/get-started-button'
import { HeroAnnouncement } from '~/components/landing/hero/announcement'
import { HeroIntro } from '~/components/landing/hero/intro'
import { HeroShell } from '~/components/landing/hero/shell'
import { ProductShot } from '~/components/landing/preview/product-shot'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { HERO_FOOTNOTE, HERO_LEAD, HERO_TITLE } from '~/data/landing/hero'
import { HOW_IT_WORKS_ID } from '~/data/landing/how-it-works'
import { scrollToId } from '~/lib/scroll'

export function HeroSection() {
    return (
        <HeroShell>
            <HeroIntro
                badge={<HeroAnnouncement />}
                title={HERO_TITLE}
                lead={HERO_LEAD}
                actions={
                    <>
                        <GetStartedButton />
                        <Button
                            variant='ghost'
                            size='pill'
                            onClick={() => scrollToId(HOW_IT_WORKS_ID)}>
                            How it works
                            <ArrowRight />
                        </Button>
                    </>
                }
                footer={
                    <Text
                        variant='caption'
                        className='mt-5'>
                        {HERO_FOOTNOTE}
                    </Text>
                }
            />
            <ProductShot />
        </HeroShell>
    )
}
