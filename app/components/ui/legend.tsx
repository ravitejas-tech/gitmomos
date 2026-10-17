import { LegendItem, type LegendItemProps } from '~/components/ui/legend-item'

export function Legend({ items }: { items: readonly LegendItemProps[] }) {
    return (
        <ul className='flex flex-wrap gap-x-4 gap-y-1.5'>
            {items.map((item) => (
                <LegendItem
                    key={item.label}
                    {...item}
                />
            ))}
        </ul>
    )
}
