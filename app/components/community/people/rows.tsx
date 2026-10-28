import type { LucideIcon } from 'lucide-react'
import { PersonRow } from '~/components/community/people/row'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { Skeleton } from '~/components/ui/skeleton'
import { memberName } from '~/lib/community/member'
import type { CommunityMember } from '~/types/community'

export interface PeopleRowsProps<T extends CommunityMember> {
    people: T[] | undefined
    isError: boolean
    onRetry: () => void
    empty: { icon: LucideIcon; title: string; description?: string }
    detail: (person: T) => string
}

export function PeopleRows<T extends CommunityMember>({ people, isError, onRetry, empty, detail }: PeopleRowsProps<T>) {
    if (isError) {
        return (
            <div className='px-5 pb-5'>
                <ErrorState onRetry={onRetry} />
            </div>
        )
    }

    if (!people) return <Skeleton className='mx-5 mb-5 h-32' />

    if (!people.length) {
        return (
            <EmptyState
                tone='plain'
                className='py-10'
                {...empty}
            />
        )
    }

    return (
        <ul className='divide-y divide-border border-t border-border'>
            {people.map((person, index) => (
                <PersonRow
                    key={person.handle ?? `${memberName(person)}-${index}`}
                    member={person}
                    detail={detail(person)}
                />
            ))}
        </ul>
    )
}
