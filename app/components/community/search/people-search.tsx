import { useCallback, useRef, useState } from 'react'
import { PeopleResults } from '~/components/community/search/people-results'
import { Card } from '~/components/ui/card'
import { SearchField } from '~/components/ui/search-field'
import { SEARCH_DEBOUNCE_MS } from '~/data/public-profile/constants'
import { useDebouncedValue } from '~/hooks/use-debounced-value'
import { useDismiss } from '~/hooks/use-dismiss'

export function PeopleSearch() {
    const ref = useRef<HTMLDivElement>(null)
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const search = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS)
    const close = useCallback(() => setIsOpen(false), [])
    useDismiss(ref, close, isOpen)

    return (
        <div
            ref={ref}
            onFocus={() => setIsOpen(true)}
            className='min-w-0 flex-1 md:relative md:max-w-md'>
            <SearchField
                label='Search people'
                placeholder='Search people'
                value={query}
                onChange={(value) => {
                    setQuery(value)
                    setIsOpen(true)
                }}
            />
            {isOpen && (
                <Card
                    tone='overlay'
                    className='absolute inset-x-4 top-full mt-2 md:inset-x-0'>
                    <div className='max-h-[min(28rem,70vh)] overflow-y-auto'>
                        <PeopleResults search={search} />
                    </div>
                </Card>
            )}
        </div>
    )
}
