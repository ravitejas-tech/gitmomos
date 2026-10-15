import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HighlightFields } from '~/components/reports/edit/highlight-fields'
import { FormActions } from '~/components/ui/form-actions'
import { FormField } from '~/components/ui/form-field'
import { Input } from '~/components/ui/input'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Textarea } from '~/components/ui/textarea'
import { REPORT_LIST_FIELDS } from '~/data/reports/edit-fields'
import { useUpdateReport } from '~/hooks/reports/mutations'
import { fromLines, toLines } from '~/lib/lines'
import { reportEditSchema, type ReportContent, type ReportEditData } from '~/schemas/report.schema'

export interface EditReportFormProps {
    reportId: string
    content: ReportContent
    onDone: () => void
}

export function EditReportForm({ reportId, content, onDone }: EditReportFormProps) {
    const { mutate: updateReport, isPending } = useUpdateReport()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReportEditData>({
        resolver: zodResolver(reportEditSchema),
        defaultValues: {
            headline: content.headline,
            summary: content.summary,
            highlights: content.highlights,
            key_work_areas: toLines(content.key_work_areas),
            suggestions: toLines(content.suggestions),
        },
    })

    const save = (data: ReportEditData) =>
        updateReport(
            {
                id: reportId,
                content: {
                    ...content,
                    headline: data.headline,
                    summary: data.summary,
                    highlights: data.highlights,
                    key_work_areas: fromLines(data.key_work_areas),
                    suggestions: fromLines(data.suggestions),
                },
            },
            { onSuccess: onDone },
        )

    return (
        <form onSubmit={handleSubmit(save)}>
            <div className='max-h-[70vh] space-y-6 overflow-y-auto p-5'>
                <FormField
                    id='headline'
                    label='Headline'
                    error={errors.headline?.message}>
                    <Input
                        id='headline'
                        {...register('headline')}
                    />
                </FormField>
                <FormField
                    id='summary'
                    label='Summary'
                    error={errors.summary?.message}>
                    <Textarea
                        id='summary'
                        rows={4}
                        {...register('summary')}
                    />
                </FormField>
                <HighlightFields
                    control={control}
                    register={register}
                    errors={errors.highlights}
                />
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {REPORT_LIST_FIELDS.map(({ name, label, rows }) => (
                        <FormField
                            key={name}
                            id={name}
                            label={label}>
                            <Textarea
                                id={name}
                                rows={rows}
                                placeholder='One item per line'
                                {...register(name)}
                            />
                        </FormField>
                    ))}
                </div>
            </div>
            <PanelFooter>
                <FormActions
                    submitLabel='Save changes'
                    isPending={isPending}
                    onCancel={onDone}
                />
            </PanelFooter>
        </form>
    )
}
