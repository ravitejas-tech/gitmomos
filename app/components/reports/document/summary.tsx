import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'

export interface ReportSummaryProps {
    summary: string
    areas: string[]
}

export function ReportSummary({ summary, areas }: ReportSummaryProps) {
    return (
        <div className='space-y-4'>
            <Text
                variant='lead'
                className='leading-8'>
                {summary}
            </Text>
            {areas.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                    {areas.map((area) => (
                        <Badge
                            key={area}
                            variant='accent'>
                            {area}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
