import { Badge } from '~/components/ui/badge'
import { BulletItem } from '~/components/ui/bullet-item'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'
import { ROADMAP_STATUS } from '~/data/landing/roadmap'
import type { ComingSoonFeature } from '~/types/coming-soon'

export function RoadmapFeatureCard({ slug, icon, title, description, points }: ComingSoonFeature) {
    return (
        <Card
            id={slug}
            padding='lg'
            className='flex h-full scroll-mt-24 flex-col gap-5'>
            <div className='flex items-center justify-between gap-3'>
                <IconChip
                    icon={icon}
                    tone='accent'
                    size='md'
                />
                <Badge>{ROADMAP_STATUS}</Badge>
            </div>
            <div className='space-y-1.5'>
                <Text
                    as='h3'
                    variant='subheading'>
                    {title}
                </Text>
                <Text tone='secondary'>{description}</Text>
            </div>
            <ul className='mt-auto space-y-1.5 border-t border-border pt-4'>
                {points.map((point) => (
                    <BulletItem
                        key={point.title}
                        tone='accent'
                        variant='caption'>
                        {point.title}
                    </BulletItem>
                ))}
            </ul>
        </Card>
    )
}
