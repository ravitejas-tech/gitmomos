import { Text } from '~/components/ui/text'

export function ChartEmpty({ label = 'No commits in this period.' }: { label?: string }) {
    return (
        <div className='flex h-full min-h-40 items-center justify-center rounded-lg border border-dashed border-border'>
            <Text variant='caption'>{label}</Text>
        </div>
    )
}
