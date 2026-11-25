import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'
import { REPOSITORY_URL_PLACEHOLDER } from '~/data/connections/constants'
import { useAddRepository } from '~/hooks/connections/mutations'
import { repositoryUrlSchema, type RepositoryUrlData } from '~/schemas/connection.schema'

export function AddRepositoryForm() {
    const { mutate: add, isPending } = useAddRepository()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RepositoryUrlData>({ resolver: zodResolver(repositoryUrlSchema) })

    return (
        <form
            onSubmit={handleSubmit(({ url }) => add(url, { onSuccess: () => reset() }))}
            className='space-y-2'>
            <div className='flex gap-2'>
                <Input
                    aria-label='Repository URL'
                    placeholder={REPOSITORY_URL_PLACEHOLDER}
                    autoComplete='off'
                    spellCheck={false}
                    {...register('url')}
                />
                <Button
                    type='submit'
                    disabled={isPending}>
                    {isPending ? <Spinner /> : <Plus />}
                    Add
                </Button>
            </div>
            {errors.url && <FieldError>{errors.url.message}</FieldError>}
        </form>
    )
}
