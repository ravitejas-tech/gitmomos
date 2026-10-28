import { Sparkles } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { useFindMilestones } from '~/hooks/projects/mutations'
import { useFindingMilestones } from '~/hooks/projects/use-finding-milestones'
import { pluralize } from '~/lib/format'
import type { Project } from '~/types/projects'

export function MilestoneScanButton({ project }: { project: Project }) {
    const { mutate: findMilestones } = useFindMilestones()
    const isFinding = useFindingMilestones()

    if (!isFinding && project.pending === 0) return null

    return (
        <Button
            variant='secondary'
            size='sm'
            disabled={isFinding}
            onClick={() => findMilestones()}>
            {isFinding ? <Spinner /> : <Sparkles />}
            {isFinding ? 'Finding milestones' : `Check ${pluralize(project.pending, 'report')}`}
        </Button>
    )
}
