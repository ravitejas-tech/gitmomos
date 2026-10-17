import { Copy } from 'lucide-react'
import { MiniStat } from '~/components/coming-soon/mini-stat'
import { ReportSection } from '~/components/reports/document/section'
import { Badge } from '~/components/ui/badge'
import { BulletItem } from '~/components/ui/bullet-item'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { BRAG_HEADER, BRAG_PERIODS, BRAG_SECTIONS, BRAG_SELECTED_PERIOD, BRAG_STATS } from '~/data/coming-soon/brag-doc'

export function BragDocPreview() {
    return (
        <Card
            padding='lg'
            className='space-y-6'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className='flex flex-wrap gap-2'>
                    {BRAG_PERIODS.map((period) => (
                        <Badge
                            key={period}
                            variant={period === BRAG_SELECTED_PERIOD ? 'accent' : 'outline'}>
                            {period}
                        </Badge>
                    ))}
                </div>
                <Button
                    variant='secondary'
                    size='sm'>
                    <Copy />
                    Copy as Markdown
                </Button>
            </div>
            <div className='space-y-1'>
                <Text
                    as='h3'
                    variant='document-title'>
                    {BRAG_HEADER.title}
                </Text>
                <Text variant='caption'>{BRAG_HEADER.byline}</Text>
            </div>
            <div className='grid grid-cols-2 gap-4 border-y border-border py-4 sm:grid-cols-4'>
                {BRAG_STATS.map((stat) => (
                    <MiniStat
                        key={stat.label}
                        {...stat}
                    />
                ))}
            </div>
            {BRAG_SECTIONS.map(({ title, items }) => (
                <ReportSection
                    key={title}
                    title={title}>
                    <ul className='space-y-2'>
                        {items.map((item) => (
                            <BulletItem
                                key={item}
                                tone='accent'>
                                {item}
                            </BulletItem>
                        ))}
                    </ul>
                </ReportSection>
            ))}
        </Card>
    )
}
