import { MiniStat, type MiniStatProps } from '~/components/ui/mini-stat'

export interface MiniStatGridProps {
    stats: readonly Omit<MiniStatProps, 'size'>[]
    size?: MiniStatProps['size']
}

export function MiniStatGrid({ stats, size }: MiniStatGridProps) {
    return (
        <div className='grid grid-cols-3 gap-4'>
            {stats.map((stat) => (
                <MiniStat
                    key={stat.label}
                    size={size}
                    {...stat}
                />
            ))}
        </div>
    )
}
