import { useState } from 'react'
import { CommitRow } from '~/components/commits/commit-row'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { COMMIT_PREVIEW_COUNT } from '~/data/commits/constants'
import type { Commit } from '~/types/commits'

export interface CommitListProps {
    commits: Commit[] | undefined
    isLoading: boolean
    emptyLabel: string
    relative?: boolean
}

export function CommitList({ commits, isLoading, emptyLabel, relative }: CommitListProps) {
    const [expanded, setExpanded] = useState(false)

    if (isLoading) {
        return (
            <Text
                variant='caption'
                className='px-5 py-4'>
                Loading commits…
            </Text>
        )
    }

    if (!commits?.length) {
        return (
            <Text
                variant='caption'
                className='px-5 py-4'>
                {emptyLabel}
            </Text>
        )
    }

    const hidden = commits.length - COMMIT_PREVIEW_COUNT
    const visible = expanded ? commits : commits.slice(0, COMMIT_PREVIEW_COUNT)

    return (
        <>
            <ul className='divide-y divide-border'>
                {visible.map((commit) => (
                    <CommitRow
                        key={commit.id}
                        commit={commit}
                        relative={relative}
                    />
                ))}
            </ul>
            {hidden > 0 && (
                <div className='border-t border-border px-3 py-2'>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Show less' : `Show ${hidden} more`}
                    </Button>
                </div>
            )}
        </>
    )
}
