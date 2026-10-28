import { EyeOff, Loader, Milestone } from 'lucide-react'
import { MilestoneRow } from '~/components/projects/detail/milestone-row'
import { MilestoneScanButton } from '~/components/projects/detail/scan-button'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { Skeleton } from '~/components/ui/skeleton'
import { useProjectMilestones } from '~/hooks/projects/queries'
import { useFindingMilestones } from '~/hooks/projects/use-finding-milestones'
import { pluralize } from '~/lib/format'
import type { Project } from '~/types/projects'

export interface MilestonesCardProps {
    project: Project
    className?: string
}

export function MilestonesCard({ project, className }: MilestonesCardProps) {
    const isFinding = useFindingMilestones()
    const { data: milestones, isError, refetch } = useProjectMilestones({ variables: project.repository_ids })
    const checking = isFinding || project.pending > 0

    return (
        <Card className={className}>
            <CardHeader
                title='Milestones'
                description={project.tracks_milestones && pluralize(project.milestones, 'milestone')}
                actions={project.tracks_milestones && <MilestoneScanButton project={project} />}
            />
            {!project.tracks_milestones && (
                <EmptyState
                    tone='plain'
                    icon={EyeOff}
                    title='Milestones are off'
                    description='Turn on Find milestones to collect them for this project.'
                />
            )}
            {project.tracks_milestones && !milestones && !isError && <Skeleton className='mx-5 mb-5 h-32' />}
            {project.tracks_milestones && isError && (
                <div className='px-5 pb-5'>
                    <ErrorState onRetry={() => refetch()} />
                </div>
            )}
            {project.tracks_milestones && milestones?.length === 0 && (
                <EmptyState
                    tone='plain'
                    icon={checking ? Loader : Milestone}
                    title={checking ? 'Checking your reports' : 'No milestones yet'}
                />
            )}
            {project.tracks_milestones && !!milestones?.length && (
                <ul className='divide-y divide-border border-t border-border'>
                    {milestones.map((milestone) => (
                        <MilestoneRow
                            key={milestone.id}
                            milestone={milestone}
                        />
                    ))}
                </ul>
            )}
        </Card>
    )
}
