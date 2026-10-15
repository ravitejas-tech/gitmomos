import { Text } from '~/components/ui/text'
import { repositoryName } from '~/lib/commits/message'
import { pluralize } from '~/lib/format'
import type { ReportContent } from '~/schemas/report.schema'

export function ReportProjects({ repositories }: { repositories: ReportContent['repositories'] }) {
    return (
        <ul className='grid gap-3 sm:grid-cols-2'>
            {repositories.map((repository) => (
                <li
                    key={repository.name}
                    title={repository.name}
                    className='space-y-1.5 rounded-xl border border-border p-4 break-inside-avoid'>
                    <div className='flex items-baseline justify-between gap-3'>
                        <Text
                            as='span'
                            variant='title'
                            truncate>
                            {repositoryName(repository.name)}
                        </Text>
                        <Text
                            as='span'
                            variant='caption'
                            className='shrink-0'>
                            {pluralize(repository.commit_count, 'commit')}
                        </Text>
                    </div>
                    {repository.summary && (
                        <Text
                            tone='secondary'
                            className='leading-6'>
                            {repository.summary}
                        </Text>
                    )}
                </li>
            ))}
        </ul>
    )
}
