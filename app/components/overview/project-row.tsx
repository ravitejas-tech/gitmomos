import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { repositoryName } from '~/lib/commits/message'

export interface ProjectRowProps {
    name: string
    commits: number
    percent: number
    width: number
}

export function ProjectRow({ name, commits, percent, width }: ProjectRowProps) {
    return (
        <li
            className='space-y-2'
            title={name}>
            <div className='flex items-baseline justify-between gap-3'>
                <Text
                    as='span'
                    variant='strong'
                    truncate>
                    {repositoryName(name)}
                </Text>
                <Text
                    as='span'
                    variant='caption'
                    numeric
                    className='shrink-0'>
                    {commits} · {percent}%
                </Text>
            </div>
            <ProgressBar value={width} />
        </li>
    )
}
