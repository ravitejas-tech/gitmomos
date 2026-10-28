import { Link } from 'react-router'
import { ArrowRight, CircleCheck, Milestone } from 'lucide-react'
import { MilestoneSummary } from '~/components/projects/milestone-summary'
import { OverviewSection } from '~/components/public-profile/page/overview/section'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { pluralize } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { PublicProject } from '~/types/projects'

export function PublicMilestones({ project }: { project: PublicProject }) {
    return (
        <OverviewSection title={pluralize(project.milestones.length, 'milestone')}>
            {project.milestones.length === 0 && (
                <EmptyState
                    tone='plain'
                    icon={Milestone}
                    title='No milestones yet'
                />
            )}
            <ol className='space-y-8'>
                {project.milestones.map((milestone) => (
                    <li
                        key={milestone.id}
                        className='flex gap-3'>
                        <CircleCheck className='mt-0.5 size-5 shrink-0 text-success' />
                        <div className='min-w-0 flex-1 space-y-2'>
                            <MilestoneSummary
                                date={milestone.date}
                                title={milestone.title}
                                detail={milestone.detail}
                            />
                            {milestone.shared && (
                                <Button
                                    asChild
                                    variant='link'
                                    size='inline'>
                                    <Link to={reportPath(project.handle, milestone.date)}>
                                        Read that day’s report
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </OverviewSection>
    )
}
