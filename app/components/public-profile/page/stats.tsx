import { Card } from '~/components/ui/card'
import { MiniStat } from '~/components/ui/mini-stat'
import { pluralize } from '~/lib/format'
import type { ProfileStats } from '~/types/public-profile'

export function PublicProfileStats({ stats }: { stats: ProfileStats }) {
    const tiles = [
        { label: 'commits this year', value: stats.commits.toLocaleString() },
        { label: 'active days', value: stats.active_days.toLocaleString() },
        { label: 'longest streak', value: pluralize(stats.longest_streak, 'day') },
        { label: 'projects', value: stats.projects },
    ]

    return (
        <Card
            padding='lg'
            className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {tiles.map((tile) => (
                <MiniStat
                    key={tile.label}
                    {...tile}
                />
            ))}
        </Card>
    )
}
