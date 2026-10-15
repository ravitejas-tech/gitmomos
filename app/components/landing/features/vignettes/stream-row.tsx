import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'

export interface StreamRowProps {
    sha: string
    message: string
    repo: string
    branch: string
}

export function StreamRow({ sha, message, repo, branch }: StreamRowProps) {
    return (
        <li className='relative flex items-center gap-3 pl-6'>
            <span className='absolute left-0 size-2.5 rounded-full border-2 border-accent bg-surface' />
            <div className='flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border bg-surface-muted px-3 py-2 shadow-edge'>
                <Text
                    as='span'
                    variant='meta'
                    tone='accent'
                    className='shrink-0'>
                    {sha}
                </Text>
                <Text
                    as='span'
                    tone='primary'
                    truncate
                    className='min-w-0 flex-1'>
                    {message}
                </Text>
                <Text
                    as='span'
                    variant='meta'
                    className='hidden shrink-0 lg:inline'>
                    {branch}
                </Text>
                <Badge className='shrink-0'>{repo}</Badge>
            </div>
        </li>
    )
}
