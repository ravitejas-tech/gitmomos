import { ProjectForm } from '~/components/projects/form/form'
import { Modal } from '~/components/ui/modal'
import type { Project } from '~/types/projects'

export interface ProjectModalProps {
    project?: Project | undefined
    onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    return (
        <Modal
            title={project ? 'Edit project' : 'New project'}
            onClose={onClose}>
            <ProjectForm
                project={project}
                onDone={onClose}
            />
        </Modal>
    )
}
