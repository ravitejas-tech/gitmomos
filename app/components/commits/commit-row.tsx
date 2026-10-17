import { KindDot } from '~/components/activity/kind-dot'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { WORK_KINDS } from '~/data/activity/kinds'
import { commitTitle, repositoryName } from '~/lib/commits/message'
import { formatTime, shortSha, timeAgo } from '~/lib/format'
import type { Commit } from '~/types/commits'

export interface CommitRowProps {
    commit: Commit
    relative?: boolean
}

export function CommitRow({ commit, relative }: CommitRowProps) {
    return (
        <ListRow align='start'>
            <KindDot
                kind={commit.kind}
                className='mt-1.5'
            />
            <div className='min-w-0 flex-1 space-y-0.5'>
                <Text truncate>{commitTitle(commit.message)}</Text>
                <Text
                    variant='caption'
                    truncate>
                    {repositoryName(commit.repositories.full_name)} · {WORK_KINDS[commit.kind].label}
                </Text>
            </div>
            <div className='flex shrink-0 flex-col items-end gap-0.5'>
                <Text
                    as='time'
                    variant='caption'
                    dateTime={commit.committed_at}>
                    {relative ? timeAgo(commit.committed_at) : formatTime(commit.committed_at)}
                </Text>
                {commit.html_url ? (
                    <a
                        href={commit.html_url}
                        target='_blank'
                        rel='noreferrer'
                        className='text-text-muted hover:text-accent-text'>
                        <Text
                            as='span'
                            variant='meta'
                            tone='inherit'>
                            {shortSha(commit.sha)}
                        </Text>
                    </a>
                ) : (
                    <Text
                        as='span'
                        variant='meta'>
                        {shortSha(commit.sha)}
                    </Text>
                )}
            </div>
        </ListRow>
    )
}
