import { Eye, EyeOff } from 'lucide-react'
import { MilestoneSummary } from '~/components/projects/milestone-summary'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { ListRow } from '~/components/ui/list-row'
import { useSetMilestoneHidden } from '~/hooks/projects/mutations'
import type { Milestone } from '~/types/projects'

export function MilestoneRow({ milestone }: { milestone: Milestone }) {
    const { mutate: setHidden, isPending } = useSetMilestoneHidden()
    const label = milestone.hidden ? 'Show this milestone' : 'Hide this milestone'

    return (
        <ListRow
            align='start'
            className='py-4'>
            <MilestoneSummary
                date={milestone.date}
                title={milestone.title}
                detail={milestone.detail}
                muted={milestone.hidden}
            />
            {milestone.hidden && <Badge variant='neutral'>Hidden</Badge>}
            <Button
                variant='ghost'
                size='icon'
                disabled={isPending}
                onClick={() => setHidden({ id: milestone.id, hidden: !milestone.hidden })}
                aria-label={label}
                title={label}>
                {milestone.hidden ? <Eye /> : <EyeOff />}
            </Button>
        </ListRow>
    )
}
