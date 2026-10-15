import { Text } from '~/components/ui/text'

export interface PreviewCommitRowProps {
    sha: string
    message: string
    time: string
}

export function PreviewCommitRow({ sha, message, time }: PreviewCommitRowProps) {
    return (
        <li className='flex items-center gap-3 py-2'>
            <Text
                as='span'
                variant='meta'
                tone='accent'
                className='shrink-0'>
                {sha}
            </Text>
            <Text
                as='span'
                tone='secondary'
                truncate
                className='min-w-0 flex-1'>
                {message}
            </Text>
            <Text
                as='span'
                variant='meta'
                numeric
                className='shrink-0'>
                {time}
            </Text>
        </li>
    )
}
