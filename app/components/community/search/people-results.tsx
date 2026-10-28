import { keepPreviousData } from '@tanstack/react-query'
import { SearchX, Sparkles } from 'lucide-react'
import { PeopleRows } from '~/components/community/people/rows'
import { CardHeader } from '~/components/ui/card-header'
import { SUGGESTED_PEOPLE } from '~/data/community/constants'
import { useProfileSearch } from '~/hooks/community/queries'
import { pluralize } from '~/lib/format'

export function PeopleResults({ search }: { search: string }) {
    const {
        data: matches,
        isError,
        refetch,
    } = useProfileSearch({
        variables: search,
        placeholderData: keepPreviousData,
    })
    const people = search
        ? matches
        : matches?.filter(({ is_self, is_following }) => !is_self && !is_following).slice(0, SUGGESTED_PEOPLE)

    return (
        <>
            <CardHeader
                title={search ? 'Search results' : 'People to follow'}
                description={search && matches && pluralize(matches.length, 'profile')}
            />
            <PeopleRows
                people={people}
                isError={isError}
                onRetry={() => refetch()}
                empty={
                    search
                        ? { icon: SearchX, title: 'No one matches', description: 'Try a name, a handle or a role.' }
                        : { icon: Sparkles, title: 'You follow everyone here' }
                }
                detail={(person) => person.tagline ?? `@${person.handle}`}
            />
        </>
    )
}
