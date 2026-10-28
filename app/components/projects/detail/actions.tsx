import { Link, useNavigate } from 'react-router'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PROJECTS_PATH } from '~/data/navigation'
import { useProfile } from '~/hooks/profile/queries'
import { useDeleteProject } from '~/hooks/projects/mutations'
import { projectPath } from '~/lib/public-profile/handle'
import type { Project } from '~/types/projects'

export interface ProjectActionsProps {
    project: Project
    onEdit: () => void
}

export function ProjectActions({ project, onEdit }: ProjectActionsProps) {
    const navigate = useNavigate()
    const { data: profile } = useProfile()
    const { mutate: deleteProject, isPending } = useDeleteProject()
    const shared = project.is_public && profile?.is_public && profile.handle

    const confirmDelete = () => {
        if (window.confirm(`Delete ${project.name}? Its milestones stay in your reports.`)) {
            deleteProject(project.id, { onSuccess: () => navigate(PROJECTS_PATH, { replace: true }) })
        }
    }

    return (
        <>
            <Button
                variant='danger'
                size='icon'
                onClick={confirmDelete}
                disabled={isPending}
                aria-label={`Delete ${project.name}`}
                title='Delete'>
                <Trash2 />
            </Button>
            {shared && (
                <Button
                    asChild
                    variant='secondary'>
                    <Link to={projectPath(shared, project.slug)}>
                        <ExternalLink />
                        View on profile
                    </Link>
                </Button>
            )}
            <Button onClick={onEdit}>
                <Pencil />
                Edit
            </Button>
        </>
    )
}
