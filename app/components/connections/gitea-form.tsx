import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormActions } from '~/components/ui/form-actions'
import { FormField } from '~/components/ui/form-field'
import { Input } from '~/components/ui/input'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Text } from '~/components/ui/text'
import { useConnectGitea } from '~/hooks/connections/mutations'
import { giteaConnectionSchema, type GiteaConnectionData } from '~/schemas/connection.schema'

export function GiteaForm({ onConnected }: { onConnected: () => void }) {
    const { mutate: connect, isPending } = useConnectGitea()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GiteaConnectionData>({ resolver: zodResolver(giteaConnectionSchema) })

    return (
        <form onSubmit={handleSubmit((data) => connect(data, { onSuccess: onConnected }))}>
            <div className='space-y-4 p-5'>
                <FormField
                    id='gitea-url'
                    label='Gitea URL'
                    error={errors.baseUrl?.message}>
                    <Input
                        id='gitea-url'
                        type='url'
                        placeholder='https://gitea.example.com'
                        autoFocus
                        {...register('baseUrl')}
                    />
                </FormField>
                <FormField
                    id='gitea-token'
                    label='Access token'
                    error={errors.token?.message}
                    hint={
                        <>
                            Create one under Settings → Applications with{' '}
                            <Text
                                as='code'
                                variant='code'
                                tone='accent'>
                                read:repository
                            </Text>{' '}
                            and{' '}
                            <Text
                                as='code'
                                variant='code'
                                tone='accent'>
                                read:user
                            </Text>
                            .
                        </>
                    }>
                    <Input
                        id='gitea-token'
                        type='password'
                        autoComplete='off'
                        placeholder='Paste a token'
                        {...register('token')}
                    />
                </FormField>
            </div>
            <PanelFooter>
                <FormActions
                    submitLabel='Connect'
                    isPending={isPending}
                    onCancel={onConnected}
                />
            </PanelFooter>
        </form>
    )
}
