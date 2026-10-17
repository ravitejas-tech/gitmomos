import { WorkMixBar } from '~/components/activity/work-mix-bar'
import { MomentCard } from '~/components/coming-soon/wrapped/moment-card'
import { WrappedHero } from '~/components/coming-soon/wrapped/hero'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { WRAPPED_KINDS, WRAPPED_MOMENTS } from '~/data/coming-soon/wrapped'

export function WrappedPreview() {
    return (
        <div className='space-y-4'>
            <div className='grid gap-4 lg:grid-cols-2'>
                <WrappedHero />
                <div className='grid gap-4'>
                    {WRAPPED_MOMENTS.map((moment) => (
                        <MomentCard
                            key={moment.title}
                            {...moment}
                        />
                    ))}
                </div>
            </div>
            <Card
                padding='md'
                className='space-y-3'>
                <Text variant='title'>What you worked on</Text>
                <WorkMixBar kinds={WRAPPED_KINDS} />
            </Card>
        </div>
    )
}
