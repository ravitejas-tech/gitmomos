import { BulletItem } from '~/components/ui/bullet-item'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { CopyButton } from '~/components/ui/copy-button'
import { REPORT_SECTIONS } from '~/data/reports/sections'
import { briefToText } from '~/lib/reports/brief'

export function ReportQuickSummary({ points }: { points: string[] }) {
    return (
        <Card className='print:hidden'>
            <CardHeader
                title={REPORT_SECTIONS.brief}
                actions={<CopyButton text={briefToText(points)} />}
            />
            <CardContent>
                <ul className='space-y-2'>
                    {points.map((point) => (
                        <BulletItem
                            key={point}
                            tone='accent'
                            variant='body'>
                            {point}
                        </BulletItem>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
