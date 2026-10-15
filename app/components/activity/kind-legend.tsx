import { KindDot } from '~/components/activity/kind-dot'
import { Text } from '~/components/ui/text'
import { WORK_KINDS } from '~/data/activity/kinds'
import type { WorkKind } from '~/types/activity'

export function KindLegend({ kinds }: { kinds: readonly WorkKind[] }) {
    return (
        <ul className='flex flex-wrap gap-x-4 gap-y-1.5'>
            {kinds.map((kind) => (
                <li
                    key={kind}
                    className='flex items-center gap-1.5'>
                    <KindDot kind={kind} />
                    <Text
                        as='span'
                        variant='caption'
                        tone='secondary'>
                        {WORK_KINDS[kind].label}
                    </Text>
                </li>
            ))}
        </ul>
    )
}
