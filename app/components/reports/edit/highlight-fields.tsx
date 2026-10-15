import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { Textarea } from '~/components/ui/textarea'
import { EMPTY_HIGHLIGHT } from '~/data/reports/edit-fields'
import type { ReportEditData } from '~/schemas/report.schema'

export interface HighlightFieldsProps {
    control: Control<ReportEditData>
    register: UseFormRegister<ReportEditData>
    errors: FieldErrors<ReportEditData>['highlights']
}

export function HighlightFields({ control, register, errors }: HighlightFieldsProps) {
    const { fields, append, remove } = useFieldArray({ control, name: 'highlights' })

    return (
        <fieldset className='space-y-3'>
            <Text
                as='div'
                variant='strong'>
                Highlights
            </Text>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className='space-y-2 rounded-xl border border-border p-3'>
                    <div className='flex items-center gap-2'>
                        <Input
                            aria-label={`Highlight ${index + 1} title`}
                            placeholder='What got done'
                            {...register(`highlights.${index}.title`)}
                        />
                        <Button
                            type='button'
                            variant='danger'
                            size='icon'
                            aria-label='Remove highlight'
                            onClick={() => remove(index)}>
                            <Trash2 />
                        </Button>
                    </div>
                    <Textarea
                        aria-label={`Highlight ${index + 1} detail`}
                        placeholder='Why it matters'
                        rows={3}
                        {...register(`highlights.${index}.detail`)}
                    />
                    {errors?.[index]?.title?.message && <FieldError>{errors[index].title.message}</FieldError>}
                </div>
            ))}
            <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={() => append(EMPTY_HIGHLIGHT)}>
                <Plus />
                Add highlight
            </Button>
        </fieldset>
    )
}
