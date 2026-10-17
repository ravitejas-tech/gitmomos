import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'

export interface GoalRowProps {
    title: string
    progress: number
    detail: string
}

export function GoalRow({ title, progress, detail }: GoalRowProps) {
    return (
        <li className='space-y-2'>
            <div className='flex items-baseline justify-between gap-3'>
                <Text
                    as='span'
                    variant='strong'
                    truncate>
                    {title}
                </Text>
                <Text
                    as='span'
                    variant='caption'
                    className='shrink-0'>
                    {detail}
                </Text>
            </div>
            <ProgressBar value={progress} />
        </li>
    )
}
