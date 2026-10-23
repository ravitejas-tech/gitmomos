import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Momi } from '~/components/ui/momi'
import { Text } from '~/components/ui/text'
import { SIGNUP_PATH } from '~/data/navigation'
import { MADE_WITH } from '~/data/public-profile/momi'

export function MadeWith() {
    return (
        <aside className='flex flex-col items-center gap-3 border-t border-border pt-12 text-center print:hidden'>
            <Momi
                mood='happy'
                className='size-12'
            />
            <Text variant='strong'>{MADE_WITH.title}</Text>
            <Text
                variant='caption'
                className='max-w-md'>
                {MADE_WITH.description}
            </Text>
            <Button
                asChild
                variant='secondary'
                size='sm'>
                <Link to={SIGNUP_PATH}>
                    {MADE_WITH.action}
                    <ArrowRight />
                </Link>
            </Button>
        </aside>
    )
}
