import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GitCommitHorizontal, RotateCcw, Timer } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { FormActions } from '~/components/ui/form-actions'
import { FormField } from '~/components/ui/form-field'
import { Input } from '~/components/ui/input'
import { MetaItem } from '~/components/ui/meta-item'
import { ModalBody } from '~/components/ui/modal-body'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { useResetTimesheetEntry, useSaveTimesheetEntry } from '~/hooks/timesheet/mutations'
import { formatDay, formatDuration, pluralize } from '~/lib/format'
import { joinMinutes, splitMinutes } from '~/lib/timesheet/hours'
import { timesheetHoursSchema, type TimesheetHoursData } from '~/schemas/timesheet.schema'
import type { OwnTimesheetDay } from '~/types/timesheet'

export interface EditHoursFormProps {
    day: OwnTimesheetDay
    onDone: () => void
}

export function EditHoursForm({ day, onDone }: EditHoursFormProps) {
    const { mutate: saveEntry, isPending: isSaving } = useSaveTimesheetEntry()
    const { mutate: resetEntry, isPending: isResetting } = useResetTimesheetEntry()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TimesheetHoursData>({
        resolver: zodResolver(timesheetHoursSchema),
        defaultValues: splitMinutes(day.minutes),
    })

    return (
        <form
            noValidate
            onSubmit={handleSubmit((data) =>
                saveEntry({ date: day.date, minutes: joinMinutes(data) }, { onSuccess: onDone }),
            )}>
            <ModalBody>
                <div className='space-y-2'>
                    <Text variant='subheading'>{formatDay(day.date)}</Text>
                    <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
                        <MetaItem icon={Timer}>Estimate {formatDuration(day.estimated)}</MetaItem>
                        <MetaItem icon={GitCommitHorizontal}>{pluralize(day.commits, 'commit')}</MetaItem>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        id='timesheet-hours'
                        label='Hours'
                        error={errors.hours?.message}>
                        <Input
                            id='timesheet-hours'
                            type='number'
                            inputMode='numeric'
                            min={0}
                            max={24}
                            autoFocus
                            {...register('hours', { valueAsNumber: true })}
                        />
                    </FormField>
                    <FormField
                        id='timesheet-minutes'
                        label='Minutes'
                        error={errors.minutes?.message}>
                        <Input
                            id='timesheet-minutes'
                            type='number'
                            inputMode='numeric'
                            min={0}
                            max={59}
                            {...register('minutes', { valueAsNumber: true })}
                        />
                    </FormField>
                </div>
            </ModalBody>
            <PanelFooter className='flex items-center justify-end gap-3'>
                {day.edited && (
                    <Button
                        type='button'
                        variant='ghost'
                        disabled={isResetting || isSaving}
                        onClick={() => resetEntry(day.date, { onSuccess: onDone })}
                        className='mr-auto'>
                        {isResetting ? <Spinner /> : <RotateCcw />}
                        Use estimate
                    </Button>
                )}
                <FormActions
                    submitLabel='Save'
                    isPending={isSaving}
                    onCancel={onDone}
                />
            </PanelFooter>
        </form>
    )
}
