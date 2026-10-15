import { KindDot } from '~/components/activity/kind-dot'
import { Text } from '~/components/ui/text'
import { WORK_KINDS } from '~/data/activity/kinds'
import { share } from '~/lib/activity/stats'
import type { Activity } from '~/types/activity'

export function WorkMixBar({ kinds }: { kinds: Activity['kinds'] }) {
    const total = kinds.reduce((sum, item) => sum + item.commits, 0)

    return (
        <div className='space-y-3'>
            <div className='flex h-2.5 gap-0.5 overflow-hidden rounded-full'>
                {kinds.map(({ kind, commits }) => (
                    <span
                        key={kind}
                        className={WORK_KINDS[kind].dot}
                        style={{ width: `${share(commits, total)}%` }}
                    />
                ))}
            </div>
            <ul className='flex flex-wrap gap-x-5 gap-y-2'>
                {kinds.map(({ kind, commits }) => (
                    <li
                        key={kind}
                        className='flex items-center gap-2'>
                        <KindDot kind={kind} />
                        <Text
                            as='span'
                            variant='caption'
                            tone='secondary'>
                            {WORK_KINDS[kind].label}
                        </Text>
                        <Text
                            as='span'
                            variant='caption-strong'
                            tone='primary'
                            numeric>
                            {share(commits, total)}%
                        </Text>
                    </li>
                ))}
            </ul>
        </div>
    )
}
