import { UsersRound } from 'lucide-react'
import { PersonCard } from '~/components/community/people/card'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Skeleton } from '~/components/ui/skeleton'
import { PEOPLE_COPY, PEOPLE_RELATIONS } from '~/data/community/constants'
import { LOADING_ROWS } from '~/data/public-profile/constants'
import { usePeople } from '~/hooks/community/queries'
import { memberName } from '~/lib/community/member'
import { timeAgo } from '~/lib/format'
import type { CommunityRelation } from '~/types/community'

export interface PeopleSectionProps {
    relation: CommunityRelation
    onRelationChange: (relation: CommunityRelation) => void
}

export function PeopleSection({ relation, onRelationChange }: PeopleSectionProps) {
    const { data: people, isError, refetch } = usePeople({ variables: relation })
    const copy = PEOPLE_COPY[relation]

    return (
        <div className='space-y-4'>
            <SegmentedControl
                label='Network'
                value={relation}
                options={PEOPLE_RELATIONS}
                onChange={onRelationChange}
            />
            {isError && <ErrorState onRetry={() => refetch()} />}
            {!people && !isError && (
                <div className='grid gap-4 md:grid-cols-2'>
                    {LOADING_ROWS.map((row) => (
                        <Skeleton
                            key={row}
                            className='h-28'
                        />
                    ))}
                </div>
            )}
            {people?.length === 0 && (
                <EmptyState
                    icon={UsersRound}
                    title={copy.empty}
                />
            )}
            {!!people?.length && (
                <div className='grid gap-4 md:grid-cols-2'>
                    {people.map((person, index) => (
                        <PersonCard
                            key={person.handle ?? `${memberName(person)}-${index}`}
                            person={person}
                            since={`${copy.since} ${timeAgo(person.since)}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
