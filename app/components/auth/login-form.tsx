import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/components/ui/button'
import { FormField } from '~/components/ui/form-field'
import { Input } from '~/components/ui/input'
import { PasswordInput } from '~/components/ui/password-input'
import { Spinner } from '~/components/ui/spinner'
import { useLogin, useSendPasswordReset } from '~/hooks/auth/mutations'
import { loginSchema, type LoginData } from '~/schemas/auth.schema'

export interface LoginFormProps {
    onSignedIn: () => void
}

export function LoginForm({ onSignedIn }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })
    const { mutate: login, isPending } = useLogin()
    const { mutate: sendReset, isPending: isSendingReset } = useSendPasswordReset()

    const handleForgotPassword = () => {
        const email = getValues('email')
        if (email) sendReset(email)
        else setError('email', { message: 'Enter your email first' })
    }

    return (
        <form
            onSubmit={handleSubmit((data) => login(data, { onSuccess: onSignedIn }))}
            className='space-y-4'>
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
                error={errors.password?.message}
                labelAction={
                    <Button
                        type='button'
                        variant='link'
                        size='inline'
                        onClick={handleForgotPassword}
                        disabled={isSendingReset}>
                        Forgot password?
                    </Button>
                }>
                <PasswordInput
                    id='password'
                    autoComplete='current-password'
                    placeholder='••••••••'
                    {...register('password')}
                />
            </FormField>
            <Button
                type='submit'
                size='lg'
                className='w-full'
                disabled={isPending}>
                {isPending && <Spinner />}
                Log in
            </Button>
        </form>
    )
}
