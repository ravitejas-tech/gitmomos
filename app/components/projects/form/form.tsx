import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RepositoryPicker } from '~/components/projects/form/repository-picker'
import { SwitchField } from '~/components/projects/form/switch-field'
import { FormActions } from '~/components/ui/form-actions'
import { FormField } from '~/components/ui/form-field'
import { Input } from '~/components/ui/input'
import { ModalBody } from '~/components/ui/modal-body'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Textarea } from '~/components/ui/textarea'
import {
    PROJECT_DESCRIPTION_MAX_LENGTH,
    PROJECT_NAME_MAX_LENGTH,
    PROJECT_URL_MAX_LENGTH,
} from '~/data/projects/constants'
import { useFindMilestones, useSaveProject } from '~/hooks/projects/mutations'
import { projectFormValues } from '~/lib/projects/form'
import { projectFormSchema, type ProjectFormData } from '~/schemas/project.schema'
import type { Project } from '~/types/projects'

export interface ProjectFormProps {
    project: Project | undefined
    onDone: () => void
}

export function ProjectForm({ project, onDone }: ProjectFormProps) {
    const { mutate: saveProject, isPending } = useSaveProject()
    const { mutate: findMilestones } = useFindMilestones()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: projectFormValues(project),
    })

    const submit = (data: ProjectFormData) =>
        saveProject(
            { ...data, id: project?.id },
            {
                onSuccess: () => {
                    onDone()
                    if (data.tracksMilestones) findMilestones()
                },
            },
        )

    return (
        <form
            noValidate
            onSubmit={handleSubmit(submit)}>
            <ModalBody>
                <FormField
                    id='project-name'
                    label='Name'
                    error={errors.name?.message}>
                    <Input
                        id='project-name'
                        autoFocus
                        placeholder='Mobile app'
                        maxLength={PROJECT_NAME_MAX_LENGTH}
                        {...register('name')}
                    />
                </FormField>
                <FormField
                    id='project-description'
                    label='Description'
                    error={errors.description?.message}>
                    <Textarea
                        id='project-description'
                        rows={3}
                        placeholder='What it is and who it’s for'
                        maxLength={PROJECT_DESCRIPTION_MAX_LENGTH}
                        {...register('description')}
                    />
                </FormField>
                <FormField
                    id='project-url'
                    label='Link'
                    error={errors.url?.message}>
                    <Input
                        id='project-url'
                        type='url'
                        inputMode='url'
                        placeholder='https://'
                        maxLength={PROJECT_URL_MAX_LENGTH}
                        {...register('url')}
                    />
                </FormField>
                <FormField
                    id='project-repositories'
                    label='Repositories'
                    error={errors.repositoryIds?.message}>
                    <Controller
                        control={control}
                        name='repositoryIds'
                        render={({ field }) => (
                            <RepositoryPicker
                                id='project-repositories'
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormField>
                <div className='space-y-4'>
                    <Controller
                        control={control}
                        name='isPublic'
                        render={({ field }) => (
                            <SwitchField
                                label='Show on my profile'
                                description='Visitors see this project and its milestones.'
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='tracksMilestones'
                        render={({ field }) => (
                            <SwitchField
                                label='Find milestones'
                                description='Launches, releases and finished features are picked out of your reports.'
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </ModalBody>
            <PanelFooter>
                <FormActions
                    submitLabel={project ? 'Save' : 'Create project'}
                    isPending={isPending}
                    onCancel={onDone}
                />
            </PanelFooter>
        </form>
    )
}
