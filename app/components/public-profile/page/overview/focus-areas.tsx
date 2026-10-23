import { OverviewSection } from '~/components/public-profile/page/overview/section'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { pluralize } from '~/lib/format'
import type { FocusArea } from '~/types/public-profile'

export function FocusAreas({ areas }: { areas: FocusArea[] }) {
    const top = areas[0]?.reports ?? 0
    if (!top) return null

    return (
        <OverviewSection title='Focus areas'>
            <ul className='space-y-4'>
                {areas.map(({ name, reports }) => (
                    <li
                        key={name}
                        className='space-y-1.5'>
                        <div className='flex items-baseline justify-between gap-3'>
                            <Text
                                as='span'
                                variant='strong'
                                truncate>
                                {name}
                            </Text>
                            <Text
                                as='span'
                                variant='caption'
                                numeric>
                                {pluralize(reports, 'day')}
                            </Text>
                        </div>
                        <ProgressBar value={(reports / top) * 100} />
                    </li>
                ))}
            </ul>
        </OverviewSection>
    )
}
