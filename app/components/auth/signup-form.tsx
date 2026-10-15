import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLink } from '~/components/auth/auth-link'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { FormField } from '~/components/ui/form-field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { PasswordInput } from '~/components/ui/password-input'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { PRIVACY_PATH } from '~/data/navigation'
import { signupSchema, type SignupData } from '~/schemas/auth.schema'

export interface SignupFormProps {
    isPending: boolean
    onSubmit: (data: SignupData) => void
}

export function SignupForm({ isPending, onSubmit }: SignupFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupData>({ resolver: zodResolver(signupSchema), defaultValues: { acceptPrivacy: false } })

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'>
            <FormField
                id='full-name'
                label='Full name'
                error={errors.fullName?.message}>
                <Input
                    id='full-name'
                    autoComplete='name'
                    placeholder='Ada Lovelace'
                    {...register('fullName')}
                />
            </FormField>
            <FormField
                id='email'
                label='Email'
                error={errors.email?.message}>
                <Input
                    id='email'
                    type='email'
                    autoComplete='email'
                    placeholder='dev@example.com'
                    {...register('email')}
                />
            </FormField>
            <FormField
                id='password'
                label='Password'
                error={errors.password?.message}>
                <PasswordInput
                    id='password'
                    autoComplete='new-password'
                    placeholder='••••••••'
                    {...register('password')}
                />
            </FormField>
            <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                    <Checkbox
                        id='accept-privacy'
                        {...register('acceptPrivacy')}
                    />
                    <Text
                        as='label'
                        htmlFor='accept-privacy'
                        tone='secondary'>
                        I agree to the{' '}
                        <AuthLink
                            to={PRIVACY_PATH}
                            newTab>
                            Privacy Policy
                        </AuthLink>
                    </Text>
                </div>
                {errors.acceptPrivacy?.message && <FieldError>{errors.acceptPrivacy.message}</FieldError>}
            </div>
            <Button
                type='submit'
                size='lg'
                className='w-full'
                disabled={isPending}>
                {isPending && <Spinner />}
                Create account
            </Button>
        </form>
    )
}
