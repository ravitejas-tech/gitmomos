import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface PreviewDayRowProps {
    date: string
    summary: string
    commits: number
    active: boolean
}

export function PreviewDayRow({ date, summary, commits, active }: PreviewDayRowProps) {
    return (
        <li className={cn('rounded-md px-2.5 py-2', active && 'bg-surface-muted shadow-edge')}>
            <div className='flex items-center justify-between gap-2'>
                <Text
                    as='span'
                    variant='strong'
                    tone={active ? 'primary' : 'secondary'}>
                    {date}
                </Text>
                <Text
                    as='span'
                    variant='meta'
                    numeric>
                    {commits}
                </Text>
            </div>
            <Text
                variant='caption'
                tone={active ? 'secondary' : 'muted'}
                truncate
                className='mt-0.5'>
                {summary}
            </Text>
        </li>
    )
}
