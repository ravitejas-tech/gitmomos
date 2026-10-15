import { Text } from '~/components/ui/text'
import type { ReportContent } from '~/schemas/report.schema'

export function PreviewRepositoryRow({ name, commit_count }: ReportContent['repositories'][number]) {
    return (
        <li className='flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0'>
            <Text
                as='span'
                variant='code'
                tone='primary'
                truncate>
                {name}
            </Text>
            <Text
                as='span'
                variant='meta'
                numeric
                className='shrink-0'>
                {commit_count}
            </Text>
        </li>
    )
}
