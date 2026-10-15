import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsRow } from '~/components/settings/settings-row'
import { SettingsSection } from '~/components/settings/settings-section'
import { FieldError } from '~/components/ui/field-error'
import { FormActions } from '~/components/ui/form-actions'
import { PanelFooter } from '~/components/ui/panel-footer'
import { PasswordInput } from '~/components/ui/password-input'
import { useUpdatePassword } from '~/hooks/auth/mutations'
import { passwordSchema, type PasswordData } from '~/schemas/auth.schema'

export function PasswordSection() {
    const { mutate: updatePassword, isPending } = useUpdatePassword()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordData>({ resolver: zodResolver(passwordSchema) })

    return (
        <SettingsSection title='Security'>
            <form onSubmit={handleSubmit((data) => updatePassword(data, { onSuccess: () => reset() }))}>
                <SettingsRow
                    label='New password'
                    htmlFor='new-password'
                    description={errors.password?.message && <FieldError>{errors.password.message}</FieldError>}>
                    <PasswordInput
                        id='new-password'
                        autoComplete='new-password'
                        {...register('password')}
                    />
                </SettingsRow>
                <PanelFooter>
                    <FormActions
                        submitLabel='Update password'
                        isPending={isPending}
                    />
                </PanelFooter>
            </form>
        </SettingsSection>
    )
}
