import { Gift, Share2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { WRAPPED_COMMITS, WRAPPED_HIGHLIGHTS, WRAPPED_PROJECTS, WRAPPED_YEAR } from '~/data/coming-soon/wrapped'

export function WrappedHero() {
    return (
        <div className='flex flex-col justify-between gap-8 rounded-xl bg-accent p-6 text-accent-foreground shadow-edge'>
            <div className='flex items-center gap-2'>
                <Gift className='size-4' />
                <Text
                    as='span'
                    variant='eyebrow'
                    tone='inherit'>
                    {WRAPPED_YEAR} Wrapped
                </Text>
            </div>
            <div className='space-y-2'>
                <Text
                    variant='eyebrow'
                    tone='inherit'
                    className='opacity-80'>
                    This year you made
                </Text>
                <Text
                    variant='display'
                    tone='inherit'>
                    {WRAPPED_COMMITS} commits
                </Text>
                <Text
                    tone='inherit'
                    className='opacity-80'>
                    across {WRAPPED_PROJECTS} projects
                </Text>
            </div>
            <dl className='grid grid-cols-3 gap-4'>
                {WRAPPED_HIGHLIGHTS.map(({ label, value }) => (
                    <div key={label}>
                        <Text
                            as='div'
                            variant='caption'
                            tone='inherit'
                            className='opacity-80'>
                            {label}
                        </Text>
                        <Text
                            as='div'
                            variant='subheading'
                            tone='inherit'>
                            {value}
                        </Text>
                    </div>
                ))}
            </dl>
            <Button
                variant='secondary'
                className='self-start'>
                <Share2 />
                Share your Wrapped
            </Button>
        </div>
    )
}
